import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { auditService } from "./services/audit";

// Create MongoDB client
const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/geenius-template";

// Debug logging for deployment issues
console.log('🔧 Better Auth Configuration Debug:');
console.log('  - MONGODB_URI present:', !!process.env.MONGODB_URI);
console.log('  - DATABASE_URL present:', !!process.env.DATABASE_URL);
console.log('  - BETTER_AUTH_SECRET present:', !!process.env.BETTER_AUTH_SECRET);
console.log('  - BETTER_AUTH_URL:', process.env.BETTER_AUTH_URL);
console.log('  - Using MongoDB URI:', mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//[credentials]@')); // Mask credentials

// Initialize MongoDB client with error handling
let client: MongoClient;
let authInstance: any;

try {
  client = new MongoClient(mongoUri);
  console.log('✅ MongoDB client created successfully');
} catch (error: any) {
  console.error('❌ Failed to create MongoDB client:', error.message);
  throw new Error(`MongoDB client initialization failed: ${error.message}`);
}

// Create auth instance with MongoDB adapter
try {
  authInstance = betterAuth({
    database: mongodbAdapter(client.db()),
    secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key-change-this-in-production-min-32-chars",
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 24 hours
    },
    trustedOrigins: [
      process.env.BETTER_AUTH_URL || "http://localhost:5176",
      "http://localhost:8889",
      "https://localhost:8889",
      // Add specific site URL if provided
      ...(process.env.SITE_URL ? [process.env.SITE_URL] : []),
      ...(process.env.URL ? [process.env.URL] : []),
      // Add current Netlify deployment URL
      ...(process.env.DEPLOY_URL ? [process.env.DEPLOY_URL] : []),
      ...(process.env.DEPLOY_PRIME_URL ? [process.env.DEPLOY_PRIME_URL] : []),
    ],
    onRequest: async (request) => {
      // Log auth-related requests
      const url = new URL(request.url);
      const path = url.pathname;
      
      // Skip non-auth endpoints
      if (!path.includes('/auth/')) return;
      
      // Extract user info from session if available
      const cookies = request.headers.get('cookie') || '';
      const sessionToken = cookies.split(';')
        .find(c => c.trim().startsWith('better-auth.session_token='))
        ?.split('=')[1];
      
      if (sessionToken) {
        try {
          const db = client.db();
          const session = await db.collection('session').findOne({ token: sessionToken });
          
          if (session && session.userId) {
            // Log various auth actions
            if (path.includes('/sign-out')) {
              await auditService.logAuth(session.userId, 'logout', request);
            }
          }
        } catch (error) {
          console.error('[Auth] Failed to log audit event:', error);
        }
      }
    },
    onResponse: async (response, request) => {
      // Log successful auth events
      const url = new URL(request.url);
      const path = url.pathname;
      
      if (!path.includes('/auth/')) return;
      
      if (response.status === 200) {
        try {
          const body = await response.clone().json().catch(() => ({}));
          
          if (path.includes('/sign-in') && body.user) {
            await auditService.logAuth(body.user.id, 'login', request);
          } else if (path.includes('/sign-up') && body.user) {
            await auditService.logUserAction(body.user.id, 'user_created', {
              email: body.user.email,
              name: body.user.name,
            }, request);
          }
        } catch (error) {
          console.error('[Auth] Failed to log audit event:', error);
        }
      } else if (response.status === 401 && path.includes('/sign-in')) {
        // Log failed login attempts
        try {
          const body = await request.clone().json().catch(() => ({}));
          if (body.email) {
            // For failed logins, we don't have a user ID, so use email as identifier
            await auditService.logAuth(body.email, 'login_failed', request, false, 'Invalid credentials');
          }
        } catch (error) {
          console.error('[Auth] Failed to log failed login:', error);
        }
      }
    },
  });
  console.log('✅ Better Auth instance created successfully');
} catch (error: any) {
  console.error('❌ Failed to create Better Auth instance:', error.message);
  throw new Error(`Better Auth initialization failed: ${error.message}`);
}

export const auth = authInstance;