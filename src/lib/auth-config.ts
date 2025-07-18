import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

// MongoDB connection helper
export async function createMongoConnection() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/geenius-template');
  await client.connect();
  return client.db();
}

// Better Auth configuration factory
export function createAuthConfig(db: any) {
  return betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    socialProviders: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      },
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 24 hours
    },
    trustedOrigins: [
      process.env.URL || 'http://localhost:5173',
      process.env.DEPLOY_PRIME_URL || 'http://localhost:5173',
      'http://localhost:5173',
      'https://localhost:5173',
    ],
    rateLimit: {
      window: 10 * 60 * 1000, // 10 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    },
    advanced: {
      generateId: () => {
        return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      },
    },
  });
}