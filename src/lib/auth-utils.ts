// Utility functions for authentication

import { authClient } from './auth-client';

// Check provider availability via API
export const checkOAuthProviders = async (): Promise<{
  github: boolean;
  google: boolean;
}> => {
  try {
    const baseURL = authClient.baseURL || window.location.origin;
    const response = await fetch(`${baseURL}/api/auth/providers`);
    if (response.ok) {
      const data = await response.json();
      return {
        github: data.github || false,
        google: data.google || false,
      };
    }
  } catch (error) {
    console.warn('Failed to check OAuth providers:', error);
  }
  
  // Default to false if we can't check
  return {
    github: false,
    google: false,
  };
};