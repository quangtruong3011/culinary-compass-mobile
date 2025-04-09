import { useCheckAuthQuery } from "@/features/auth/api/auth.api";
import { setCredentials } from "@/features/auth/store/auth.slice";
import { AppDispatch, RootState } from "@/store/store";
import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { getAuthTokens, removeAuthTokens, saveAuthTokens } from "../utils/auth.storage";


type AuthContextType = {
  user: any | null;
  access_token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login(access_token: string, user: any): Promise<void>;
  logout(): Promise<void>;
  checkAuth(): Promise<boolean>;
  // refreshToken(): Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, access_token } = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useCheckAuthQuery(undefined, {
    skip: !!access_token,
  });

  useEffect(() => {
    const loadAuthState = async () => {
      const { accessToken, refreshToken } = await getAuthTokens();

      if (accessToken && refreshToken) {
        dispatch(
          setCredentials({
            access_token: accessToken,
            refresh_token: refreshToken,
            user: null,
            // remember_me: false
          })
        );
      }
      // Lấy thông tin user từ API nếu cần thiết
    };
    loadAuthState();
  }, [dispatch]);

  const handleLogin = async (access_token: string, refresh_token: string) => {
    await saveAuthTokens(access_token, refresh_token);
    dispatch(
      setCredentials({
        access_token: access_token,
        refresh_token: refresh_token,
        user: null,
      })
    );
  };

  const handleLogout = async () => {
    await removeAuthTokens();
    dispatch(
      setCredentials({ access_token: null, refresh_token: null, user: null })
    );
  };

  const checkAuth = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("access_token");
      return !!storedToken;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        access_token,
        isLoading,
        isAuthenticated: !!access_token,
        login: handleLogin,
        logout: handleLogout,
        checkAuth,
        // refreshToken: () => {},
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
