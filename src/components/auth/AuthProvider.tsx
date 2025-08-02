import React, { createContext, useContext, useEffect } from 'react';
import { useSession, signIn, signOut, signUp } from '../../lib/auth-client';

type Session = any; // Better Auth session type
type User = any; // Better Auth user type

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: typeof signIn;
  signOut: typeof signOut;
  signUp: typeof signUp;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, isPending, error } = useSession();

  useEffect(() => {
    if (error) {
      console.warn('Session error (this is expected if backend is not running):', error);
    }
  }, [error]);

  // Check if session is valid JSON object, not HTML
  const isValidSession = session && typeof session === 'object' && session.user;
  
  useEffect(() => {
    console.log('[AuthProvider] Session data:', session);
    console.log('[AuthProvider] Is valid session:', isValidSession);
    if (session && typeof session === 'string' && session.includes('<!doctype html>')) {
      console.error('[AuthProvider] Session returned HTML instead of JSON. Check auth endpoint configuration.');
    }
  }, [session, isValidSession]);

  const value: AuthContextType = {
    session: isValidSession ? session : null,
    user: isValidSession ? session.user : null,
    isLoading: isPending,
    isAuthenticated: isValidSession,
    signIn,
    signOut,
    signUp,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};