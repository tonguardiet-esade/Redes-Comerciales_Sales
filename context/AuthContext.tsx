import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { type AuthContextType, type User } from '../types';
import { supabase } from '../lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        // 1. Silent Auth: Check for Hash Fragment tokens first
        // Expecting: #access_token=...&refresh_token=...
        const hash = window.location.hash.substring(1); // Remove the '#'
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          // Attempt to exchange tokens for a session
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (!error && data.session) {
            if (mounted) {
              setSession(data.session);
              setUser(data.session.user ?? null);
              
              // SECURITY: Clean the URL immediately to hide tokens
              window.history.replaceState(null, '', window.location.pathname);
              
              setIsLoading(false);
            }
            return; // Exit early, session established via Hash
          } else {
             console.warn("Silent auth failed:", error?.message);
             // If hash auth fails, clear hash anyway to prevent loop/confusion and fall through to local check
             window.history.replaceState(null, '', window.location.pathname);
          }
        }

        // 2. Fallback: Standard Session Check (LocalStorage)
        const { data, error } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          console.warn("Error getting session:", error.message);
          // If the token is invalid/not found, force a sign out to clean up local storage
          if (error.message && (error.message.includes("Refresh Token") || error.message.includes("refresh_token"))) {
             await supabase.auth.signOut().catch(() => {});
          }
          setSession(null);
          setUser(null);
        } else if (data && data.session) {
          setSession(data.session);
          setUser(data.session.user ?? null);
        } else {
          setSession(null);
          setUser(null);
        }
      } catch (err) {
        console.error("Unexpected error during session init:", err);
        setSession(null);
        setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    initSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      // console.log("Auth State Change:", event);

      if ((event as string) === 'TOKEN_REFRESH_REVOKED') {
        setSession(null);
        setUser(null);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
      }
      
      // Ensure loading is false after any state change (important for slow connections)
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Supabase Login Error:', error.message);
        return { success: false, message: error.message };
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
    setUser(null);
    setSession(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, login, logout, isLoading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};