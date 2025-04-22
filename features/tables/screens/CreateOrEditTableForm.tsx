import { Controller } from "react-hook-form";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { useRef } from "react";

interface CreateOrEditTableFormProps {
  control: any;
  errors: any;
}

const CreateOrEditTableForm = ({
  control,
  errors,
}: CreateOrEditTableFormProps) => {
  const numberOfSeatsRef = useRef<any>(null);

  return (
    <VStack space="lg">
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.name}
            isRequired={true}
            isDisabled={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                returnKeyType="next"
                onSubmitEditing={() => {
                  numberOfSeatsRef.current?.focus();
                }}
              />
            </Input>
            {errors.name && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.name.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="numberOfSeats"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.numberOfSeats}
            isRequired={true}
            isDisabled={false}
          >
            <FormControlLabel>
              <FormControlLabelText>Number of Seats</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                onChangeText={(text) => onChange(parseInt(text) || 0)}
                onBlur={onBlur}
                value={value?.toString()}
                keyboardType="phone-pad"
                ref={numberOfSeatsRef}
              />
            </Input>
            {errors.numberOfSeats && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.numberOfSeats.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />
    </VStack>
  );
};

export default CreateOrEditTableForm;
