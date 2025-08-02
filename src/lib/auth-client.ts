import { createAuthClient } from "better-auth/react";

// Determine the correct base URL for auth
// If we're on port 5176 (Vite dev server), redirect to 8889 (Netlify dev server)
const getAuthBaseURL = () => {
  if (typeof window === 'undefined') {
    return "http://localhost:8889/api/auth";
  }
  
  const { protocol, hostname, port } = window.location;
  
  // If running on Vite dev server port, use Netlify dev server port
  if (port === '5176') {
    console.log('[Auth] Detected Vite dev server, redirecting auth to Netlify dev server on port 8889');
    return `${protocol}//${hostname}:8889/api/auth`;
  }
  
  // Otherwise use the current origin
  return `${window.location.origin}/api/auth`;
};

export const authClient = createAuthClient({
  baseURL: getAuthBaseURL(),
  fetchOptions: {
    credentials: 'include', // Include cookies for cross-origin requests
  },
});

export const { 
  signIn, 
  signUp, 
  signOut, 
  useSession, 
  getSession,
  listSessions,
  revokeSession,
  revokeOtherSessions,
  updateUser,
  changePassword,
  changeEmail,
  deleteUser,
  forgetPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  linkSocial
} = authClient;