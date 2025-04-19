import { RootState } from "@/store/store";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { getAuthTokens } from "../auth/utils/auth.storage";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { is_authenticated, is_loading } = useSelector(
    (state: RootState) => state.auth
  );
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { accessToken } = await getAuthTokens();
      if (!is_authenticated && accessToken) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setCheckingAuth(false);
    };
    checkAuth();
  }, [is_authenticated]);

  if (checkingAuth || is_loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!is_authenticated) {
    return <Redirect href="/(auth)/login" />;
  }
  return <>{children}</>;
}
