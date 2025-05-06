import { LoginFormData, loginSchema } from "@/lib/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "../../../components/ui/form-control";
import { VStack } from "../../../components/ui/vstack";
import { Input, InputField } from "../../../components/ui/input";
import { HStack } from "../../../components/ui/hstack";
import { Link } from "expo-router";
import { Divider } from "../../../components/ui/divider";
import { Button, ButtonText } from "../../../components/ui/button";
import { Text, StyleSheet } from "react-native";

export const LoginForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: LoginFormData) => void;
  isLoading: boolean;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <VStack space="md" style={styles.form}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.email}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText size="lg" style={styles.label}>
                Email
              </FormControlLabelText>
            </FormControlLabel>
            <Input size="lg" style={styles.input}>
              <InputField
                type="text"
                placeholder="example@gmail.com"
                placeholderTextColor="#999"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
                style={styles.inputField}
              />
            </Input>
            <FormControlError>
              {errors.email?.message && (
                <FormControlErrorText style={styles.errorText}>
                  {errors.email.message}
                </FormControlErrorText>
              )}
            </FormControlError>
          </FormControl>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.password}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText size="lg" style={styles.label}>
                Password
              </FormControlLabelText>
            </FormControlLabel>
            <Input size="lg" style={styles.input}>
              <InputField
                type="password"
                placeholder="••••••"
                placeholderTextColor="#999"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
                style={styles.inputField}
              />
            </Input>
            <FormControlError>
              {errors.password?.message && (
                <FormControlErrorText style={styles.errorText}>
                  {errors.password.message}
                </FormControlErrorText>
              )}
            </FormControlError>
          </FormControl>
        )}
      />

      {/* <HStack style={styles.forgotPasswordContainer}>
        <Link href="/(auth)/forgot-password" style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </Link>
      </HStack> */}

      <Button
        size="lg"
        onPress={handleSubmit(onSubmit)}
        isDisabled={isLoading}
        style={styles.loginButton}
      >
        <ButtonText style={styles.loginButtonText}>
          {isLoading ? "Logging in..." : "Login"}
        </ButtonText>
      </Button>

      <Divider style={styles.divider} />

      <HStack style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account? </Text>
        <Link href="/(auth)/register" style={styles.registerLink}>
          <Text style={styles.registerLinkText}>Register</Text>
        </Link>
      </HStack>
    </VStack>
  );
};

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  label: {
    color: "#444",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 8,
  },
  inputField: {
    color: "#333",
    padding: 12,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 14,
    marginTop: 4,
  },
  forgotPasswordContainer: {
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    color: "#007AFF",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    height: 48,
    marginTop: 8,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  divider: {
    marginVertical: 24,
    backgroundColor: "#ddd",
  },
  registerContainer: {
    justifyContent: "center",
  },
  registerText: {
    color: "#666",
    fontSize: 14,
  },
  registerLink: {
    marginLeft: 4,
  },
  registerLinkText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
