import {
  useGetMeMutation,
  useRegisterMutation,
} from "@/features/auth/api/auth.api";
import { RegisterForm } from "@/features/auth/screens/RegisterForm";
import { RegisterFormData } from "@/lib/validation/authSchema";
import { Stack, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Box } from "@/components/ui/box";

export default function RegisterScreen() {
  const [register, { isLoading }] = useRegisterMutation();
  const [getMe] = useGetMeMutation();

  const router = useRouter();

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register(data).unwrap();
      await getMe().unwrap();

      router.push("/user");
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            title: "Register",
            headerShown: true,
          }}
        />
        <ImageBackground
          source={require("@/assets/images/bg-auth.jpg")}
          style={styles.background}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.5)"]}
            style={styles.gradient}
          >
            <Box style={styles.formContainer}>
              <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
            </Box>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
