import React, { useContext } from "react";
import { User } from "../../interfaces";
import { noop } from "../../utils/js";

export interface AuthState {
  user: User | null;
  error: Error | null;
  isLoading: boolean;
  actions: {
    loadUser: (name: string, email: string, onSuccess: () => void) => void;
    clearUser: () => void;
  };
}

export const AuthContext = React.createContext<AuthState>({
  user: null,
  error: null,
  isLoading: false,
  actions: {
    loadUser: noop,
    clearUser: noop,
  },
});

export const useAuthState = (): AuthState => {
  const authContextState = useContext(AuthContext);

  return authContextState;
};
