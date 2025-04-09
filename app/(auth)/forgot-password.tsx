import { Button } from "@/components/ui/button";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";

export default function ForgotPasswordScreen() {
  return (
    <VStack>
      <FormControl
        isInvalid={false}
        isRequired={false}
        isDisabled={false}
        isReadOnly={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Email</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField type="text" placeholder="Enter your email" />
        </Input>
        <HStack className="justify-between mt-2">
          <Link href="/(auth)/login" className="text-sm text-blue-500">
            Back to login
          </Link>
        </HStack>
        <Button className="w-full mt-4" size="sm">
          Send reset link
        </Button>
      </FormControl>
    </VStack>
  );
}
