"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  type AppwriteUser,
  getCurrentUser,
  signIn,
  signOut,
  signUp,
} from "@/lib/appwrite/auth";

type AuthContextValue = {
  user: AppwriteUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AppwriteUser>;
  register: (
    email: string,
    password: string,
    name: string,
  ) => Promise<AppwriteUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppwriteUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const loggedInUser = await signIn(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const registeredUser = await signUp(email, password, name);
      setUser(registeredUser);
      return registeredUser;
    },
    [],
  );

  const logout = useCallback(async () => {
    await signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
