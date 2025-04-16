import { AppDispatch } from "@/store/store";
import { createContext } from "react";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../store/auth.slice";

type AuthContextType = {
  logout(): Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  const logout = async () => {
    await dispatch(clearCredentials());
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
