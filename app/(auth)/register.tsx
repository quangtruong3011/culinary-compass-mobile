import { useRegisterMutation } from "@/features/auth/api/auth.api";
import { RegisterForm } from "@/features/auth/screens/RegisterForm";
import { RegisterFormData } from "@/lib/validation/authSchema";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register(data).unwrap();
      router.push("/user");
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
