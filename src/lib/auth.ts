import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDatabase } from "./mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(await getDatabase()),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
  },
  trustedOrigins: [
    process.env.VITE_APP_URL || "http://localhost:5173",
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
  ],
  rateLimit: {
    window: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  advanced: {
    generateId: () => {
      // Generate a custom ID for users (compatible with MongoDB ObjectId)
      return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    },
  },
});

export type Session = typeof auth.$Infer.Session;