import React from "react";
import { useAuth } from "./useAuth";
import { AuthContext } from "./useAuthState";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authState = useAuth();

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};
