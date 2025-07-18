import { createAuthClient } from "better-auth/react";
import type { Session } from "./auth";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8889",
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