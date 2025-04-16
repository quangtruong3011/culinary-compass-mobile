import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { RegisterFormData, registerSchema } from "@/lib/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
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
    <VStack className="w-full max-w-md px-4">
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
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                placeholder="example@gmail.com"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </Input>
            <FormControlHelper>
              {errors.email?.message && (
                <FormControlHelperText>
                  <Text style={{ color: "red" }}>{errors.email.message}</Text>
                </FormControlHelperText>
              )}
            </FormControlHelper>
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
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="password"
                placeholder="********"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </Input>
            <FormControlHelper>
              {errors.password?.message && (
                <FormControlHelperText>
                  <Text style={{ color: "red" }}>
                    {errors.password.message}
                  </Text>
                </FormControlHelperText>
              )}
            </FormControlHelper>
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
              <FormControlLabelText>Confirm Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="password"
                placeholder="********"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            </Input>
            <FormControlHelper>
              {errors.confirmPassword?.message && (
                <FormControlHelperText>
                  <Text style={{ color: "red" }}>
                    {errors.confirmPassword.message}
                  </Text>
                </FormControlHelperText>
              )}
            </FormControlHelper>
          </FormControl>
        )}
      />

      <Button size="lg" onPress={handleSubmit(onSubmit)} disabled={isLoading}>
        <ButtonSpinner color={colors.gray[400]} animating={isLoading} />
        <ButtonText>{isLoading ? "Loading..." : "Register"}</ButtonText>
      </Button>

      <Divider className="my-6" />

      <HStack className="justify-center">
        <Link href="/(auth)/login" className="text-sm text-blue-500">
          <Text>Already have an account? Login</Text>
        </Link>
      </HStack>
    </VStack>
  );
};
