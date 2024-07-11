import { useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, createContext, useMemo } from "react";
import { useSessionStorage } from "../hooks/useSessionStorage";

export type AuthenticatedUser = {
  fullName: string;
  position: string;
  token: string;
};

interface ContextValue {
  login: (user: AuthenticatedUser) => void;
  user: AuthenticatedUser | null;
  logout: () => void;
}

export const AuthContext = createContext<ContextValue>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (_user: AuthenticatedUser) => {},
  user: null,
  logout: () => {},
});

const AuthProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const queryClient = useQueryClient();

  const { storedValue, setValue } = useSessionStorage<AuthenticatedUser | null>(
    "user"
  );

  const login = (user: AuthenticatedUser) => {
    setValue(user);
  };

  const logout = () => {
    queryClient.removeQueries();
    setValue(null);
  };

  const values = useMemo(
    () => ({
      login,
      user: {
        fullName: "TEST TEST",
        position: "Employee",
        token: "TOKEN",
      } as AuthenticatedUser,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storedValue]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
