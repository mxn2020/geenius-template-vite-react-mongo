import { createAuthClient } from "better-auth/react";
import type { Session } from "./auth";

// Determine the correct base URL for different environments
const getBaseURL = () => {
  // In production, use the current site URL
  if (import.meta.env.PROD) {
    return window.location.origin;
  }
  
  // In development, use the configured API URL or default to localhost
  return import.meta.env.VITE_API_URL || "http://localhost:8889";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  basePath: "/api/auth",
});

export const {
  useSession,
  signIn,
  signUp,
  signOut,
  getSession,
} = authClient;

// Export types for components
export type { Session };
export type User = Session["user"];