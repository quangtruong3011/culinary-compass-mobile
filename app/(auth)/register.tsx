import { useRegisterMutation } from "@/features/auth/api/auth.api";
import { RegisterForm } from "@/features/auth/screens/RegisterForm";
import { setCredentials } from "@/features/auth/store/auth.slice";
import { RegisterFormData } from "@/lib/validation/authSchema";
import { useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const [register, { isLoading, isError }] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register(data).unwrap();
      router.push("../user/index");
    } catch (error) {
      console.error("Register error:", error);
      // Handle error (e.g., show a message to the user)
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
