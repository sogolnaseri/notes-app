"use client"; // Required for using state, effects, and localStorage in a client component

import React, { createContext, useContext, useEffect, useState } from "react";

// Define the shape of the authentication context
interface AuthContextType {
  isLoggedIn: boolean; // Whether the user is currently logged in
  currentUser: string | null;
  login: (username: string) => void; // Login method
  logout: () => void; // Logout method
  loading: boolean; // Whether the auth state is still being checked
}

// Create the context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider wraps your app and gives components access to auth state
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if user is logged in
  const [loading, setLoading] = useState(true); // Tracks if auth check is in progress
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Load auth status from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("loggedIn");
    const storedUser = localStorage.getItem("username");
    setIsLoggedIn(stored === "true");
    setCurrentUser(storedUser);
    setLoading(false); // Mark loading complete
  }, []);

  // Login function: saves state in localStorage and sets context
  const login = (username: string) => {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    setIsLoggedIn(true);
    setCurrentUser(username);
  };

  // Logout function: clears localStorage and updates context
  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    // Provide auth values and methods to the rest of the app
    <AuthContext.Provider
      value={{ isLoggedIn, currentUser, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuth is a custom hook to access auth values easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export { AuthContext };
