import { VStack } from "@/components/ui/vstack";
import {
  restaurantSchema,
  CreateOrEditRestaurantFormData,
} from "@/lib/validation/restaurantSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CreateOrEditRestaurantFormProps } from "../interfaces/restaurant.interface";
import { useState } from "react";

const CreateOrEditRestaurantForm = ({
  onSubmit,
  isLoading,
}: CreateOrEditRestaurantFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateOrEditRestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
  });

  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <VStack>
      <VStack></VStack>

      <Controller
        name="name"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.name}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Name</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                placeholder="Restaurant Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </Input>
            {errors.name && (
              <FormControlHelper>
                <FormControlHelperText>
                  {errors.name.message}
                </FormControlHelperText>
              </FormControlHelper>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="opening_time"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.opening_time}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Opening Time</FormControlLabelText>
            </FormControlLabel>

            {errors.opening_time && (
              <FormControlHelper>
                <FormControlHelperText>
                  {errors.opening_time.message}
                </FormControlHelperText>
              </FormControlHelper>
            )}
          </FormControl>
        )}
      />

      <Button
        onPress={handleSubmit(onSubmit)}
        isDisabled={isLoading}
        className="mt-4"
      >
        <ButtonSpinner animating={isLoading}></ButtonSpinner>
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
};

export default CreateOrEditRestaurantForm;
