import { useLoginMutation } from "@/features/auth/api/auth.api";
import { setCredentials } from "@/features/auth/store/auth.slice";
import { LoginFormData } from "@/lib/validation/authSchema";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { LoginForm } from "@/features/auth/screens/LoginForm";
import { useState } from "react";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: LoginFormData) => {
    try {
      setErrorMessage(null);
      const response = await login(data).unwrap();
      console.log("Login response:", response);

      if (response) {
        const credentials = {
          user: null,
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          // remember_me: data.remember_me,
        };

        dispatch(setCredentials(credentials));
        router.replace({ pathname: "/(tabs)/index" as "//(tabs)/index" });
      }
    } catch (error) {
      setErrorMessage(
        (error as any)?.data?.message || "Login failed. Please try again."
      );
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Welcome Back!
      </Text>
      <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
    </View>
  );
}
