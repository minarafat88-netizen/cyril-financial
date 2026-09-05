"use client";

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface UserProfile {
  id?: string | number;
  uid?: string | number;
  displayName?: string;
  name?: string;
  email: string;
  photoURL?: string;
  image?: string;
  role: 'USER' | 'LOAN_OFFICER' | 'SUPER_ADMIN';
  phoneNumber?: string;
}

interface AuthContextType {
  user: any | null;
  userProfile: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch current user data from the server's API
    async function checkUserSession() {
      try {
        const res = await fetch('/api/auth/me'); // Make sure this path is available or modify it according to your authentication system
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data);
          setUserProfile(data.profile || data);
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        setUser(null);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    }

    checkUserSession();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
    } catch (e) {
      console.error('Logout error:', e);
    }
    setUser(null);
    setUserProfile(null);
    router.push('/');
    router.refresh();
  };

  const value = { user, userProfile, loading, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};