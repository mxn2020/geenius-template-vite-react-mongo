import React, { createContext, useContext, useEffect } from 'react';
import { useSession, type Session, type User } from '../../lib/auth-client';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
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

  const value: AuthContextType = {
    session: session || null,
    user: session?.user || null,
    isLoading: isPending,
    isAuthenticated: !!session,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};