'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  fetchCurrentUser,
  getGoogleLoginUrl,
  getLogoutUrl,
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
