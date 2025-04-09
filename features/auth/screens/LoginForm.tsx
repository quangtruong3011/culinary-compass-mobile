import { LoginFormData, loginSchema } from "@/lib/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "../../../components/ui/form-control";
import { VStack } from "../../../components/ui/vstack";
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
} from "../../../components/ui/input";
import { HStack } from "../../../components/ui/hstack";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "../../../components/ui/checkbox";
import { CheckIcon, EyeOffIcon } from "../../../components/ui/icon";
import { Link } from "expo-router";
import { Divider } from "../../../components/ui/divider";
import { Button } from "../../../components/ui/button";
import { Text } from "react-native";

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
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
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
            className="mt-4"
          >
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="password"
                placeholder="******"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value || ""}
              />
              <InputSlot>
                <InputIcon>
                  <EyeOffIcon />
                </InputIcon>
              </InputSlot>
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

      <HStack className="justify-between my-4">
        <Checkbox size="md" value="remember" isDisabled={isLoading}>
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel>Remember me</CheckboxLabel>
        </Checkbox>
        <Link href="/(auth)/forgot-password" className="text-sm text-blue-500">
          <Text>Forgot password?</Text>
        </Link>
      </HStack>

      <Button
        className="w-full mt-6"
        size="md"
        onPress={handleSubmit(onSubmit)}
        isDisabled={isLoading}
      >
        <Text>{isLoading ? "Logging in..." : "Login"}</Text>
      </Button>

      <Divider className="my-6" />

      <HStack className="justify-center">
        <Link href="/(auth)/register" className="text-sm text-blue-500">
          <Text>Don't have an account? Register</Text>
        </Link>
      </HStack>
    </VStack>
  );
};
