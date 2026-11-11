'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchCurrentUser,
  getGoogleLoginUrl,
  getLogoutUrl,
  checkSession,
  onSignedOut,
  loginWithPassword as postLogin,
  registerWithPassword as postRegister,
  RegisterInput,
} from '@/lib/auth';
import { AuthUser } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  loginWithGoogle: () => void;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refetchUser = useCallback(async () => {
    setIsLoading(true);
    const currentUser = await fetchCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  // NFR-07: notice an idle-expired session when the tab regains focus or any request gets a 401,
  // instead of showing a signed-in header until the next reload.
  const signedIn = Boolean(user);
  useEffect(() => {
    if (!signedIn) return;
    const check = async () => {
      if (document.visibilityState === 'visible' && await checkSession() === 'signedOut') setUser(null);
    };
    const stop = onSignedOut(() => setUser(null));
    document.addEventListener('visibilitychange', check);
    window.addEventListener('focus', check);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', check);
      window.removeEventListener('focus', check);
    };
  }, [signedIn]);

  const loginWithGoogle = () => {
    window.location.href = getGoogleLoginUrl();
  };

  const loginWithPassword = async (email: string, password: string) => {
    setUser(await postLogin(email, password));
  };

  const register = async (input: RegisterInput) => {
    setUser(await postRegister(input));
  };

  const logout = () => {
    window.location.href = getLogoutUrl();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginWithGoogle, loginWithPassword, register, logout, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
