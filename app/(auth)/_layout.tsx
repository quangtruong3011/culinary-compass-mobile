import { useAuth } from "@/features/auth/hooks/useAuth";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { is_authenticated } = useAuth();
  if (is_authenticated) {
    return <Redirect href="/user" />;
  }
  return (
    <Stack initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );
}
