import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

console.log('=== BETTER AUTH INITIALIZATION ===');
console.log('🌍 Environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI ? '[REDACTED]' : 'NOT_SET',
  DATABASE_URL: process.env.DATABASE_URL ? '[REDACTED]' : 'NOT_SET',
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET ? '[REDACTED]' : 'NOT_SET',
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
});

// Create MongoDB client
const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "mongodb://localhost:27017/vite-react-mongo";
console.log('🔗 MongoDB URI (first 30 chars):', mongoUri.substring(0, 30) + '...');

const client = new MongoClient(mongoUri);

console.log('🔑 Auth secret source:', process.env.BETTER_AUTH_SECRET ? 'ENV_VAR' : 'FALLBACK');
console.log('🔑 Auth secret length:', (process.env.BETTER_AUTH_SECRET || "fallback-secret-key-change-this-in-production-min-32-chars").length);

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
  ],
});