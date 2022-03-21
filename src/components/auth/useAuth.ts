import axios, { AxiosError } from "axios";
import { useCallback, useState } from "react";
import { register } from "../../api/api";
import { User } from "../../interfaces";

const LOCAL_STORAGE_KEY = "auth";

const getUserFromLocalStorage = (key: string) => {
  const serializedUser = localStorage.getItem(key);

  return serializedUser !== null ? (JSON.parse(serializedUser) as User) : null;
};

const setUserToLocalStorage = (key: string, user: User | null) => {
  if (user === null) {
    return localStorage.removeItem(key);
  }

  return localStorage.setItem(key, JSON.stringify(user));
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage(LOCAL_STORAGE_KEY));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const setUserWithLocalStorage = useCallback(
    (user: User | null) => {
      setUserToLocalStorage(LOCAL_STORAGE_KEY, user);
      setUser(user);
    },
    [setUser],
  );

  const clearUser = useCallback(() => {
    setUserWithLocalStorage(null);
  }, [setUserWithLocalStorage]);

  const loadUser = useCallback(
    async (name: string, email: string, onSuccess: () => void) => {
      setIsLoading(true);
      try {
        const result = await register(name, email);

        setUserWithLocalStorage({ name, email, token: result.data.data.sl_token });

        onSuccess();
      } catch (error: unknown | AxiosError) {
        if (axios.isAxiosError(error)) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setUserWithLocalStorage],
  );

  return { user, error, isLoading, actions: { loadUser, clearUser } };
};
