import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";

export default function RegisterScreen() {
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
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField type="password" placeholder="Enter your password" />
        </Input>
      </FormControl>
    </VStack>
  );
}
