import { LoginFormData } from "@/lib/validation/authSchema";
import { useRouter } from "expo-router";
import { LoginForm } from "@/features/auth/screens/LoginForm";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLoginMutation } from "@/features/auth/api/auth.api";

export default function LoginScreen() {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
      router.push("/user");
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
