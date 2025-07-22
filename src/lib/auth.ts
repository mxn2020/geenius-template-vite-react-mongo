import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// Create MongoDB client
const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/vite-react-mongo";

// Debug logging for deployment issues
console.log('🔧 Better Auth Configuration Debug:');
console.log('  - MONGODB_URI present:', !!process.env.MONGODB_URI);
console.log('  - DATABASE_URL present:', !!process.env.DATABASE_URL);
console.log('  - BETTER_AUTH_SECRET present:', !!process.env.BETTER_AUTH_SECRET);
console.log('  - BETTER_AUTH_URL:', process.env.BETTER_AUTH_URL);
console.log('  - Using MongoDB URI:', mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//[credentials]@')); // Mask credentials

const client = new MongoClient(mongoUri);

// Create auth instance with MongoDB adapter
export const auth = betterAuth({
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
    // Add common Netlify patterns
    /https:\/\/.*\.netlify\.app$/,
    /https:\/\/.*\.netlify\.com$/,
    // Add specific site URL if provided
    ...(process.env.SITE_URL ? [process.env.SITE_URL] : []),
    ...(process.env.URL ? [process.env.URL] : []),
  ],
});