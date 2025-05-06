import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { RegisterFormData, registerSchema } from "@/lib/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, StyleSheet } from "react-native";
import colors from "tailwindcss/colors";

export const RegisterForm = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: RegisterFormData) => void;
  isLoading: boolean;
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <VStack space="md" style={styles.form}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Fill in your details to register</Text>

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
              <FormControlLabelText style={styles.label}>
                Email
              </FormControlLabelText>
            </FormControlLabel>
            <Input style={styles.input}>
              <InputField
                type="text"
                placeholder="example@gmail.com"
                placeholderTextColor="#999"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
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
              <FormControlLabelText style={styles.label}>
                Password
              </FormControlLabelText>
            </FormControlLabel>
            <Input style={styles.input}>
              <InputField
                type="password"
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
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

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.confirmPassword}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText style={styles.label}>
                Confirm Password
              </FormControlLabelText>
            </FormControlLabel>
            <Input style={styles.input}>
              <InputField
                type="password"
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                style={styles.inputField}
              />
            </Input>
            <FormControlError>
              {errors.confirmPassword?.message && (
                <FormControlErrorText style={styles.errorText}>
                  {errors.confirmPassword.message}
                </FormControlErrorText>
              )}
            </FormControlError>
          </FormControl>
        )}
      />

      <Button
        size="lg"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        style={styles.registerButton}
      >
        {isLoading && <ButtonSpinner color={colors.white} />}
        <ButtonText style={styles.registerButtonText}>
          {isLoading ? "Creating account..." : "Register"}
        </ButtonText>
      </Button>

      <Divider style={styles.divider} />

      <HStack style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <Link href="/(auth)/login" style={styles.loginLink}>
          <Text style={styles.loginLinkText}>Login</Text>
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
  registerButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    height: 48,
    marginTop: 16,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  divider: {
    marginVertical: 24,
    backgroundColor: "#ddd",
  },
  loginContainer: {
    justifyContent: "center",
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    marginLeft: 4,
  },
  loginLinkText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
});
