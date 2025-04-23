import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { bookingSchema } from "@/lib/validation/bookingSchema";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Text } from "@/components/ui/text";
import { CreateOrEditBookingDto } from "../interfaces/create-or-edit-booking.interface";
import moment from "moment";

interface CreateOrEditBookingProps {
  isLoading: boolean;
  initialValues?: Partial<CreateOrEditBookingDto>;
  onSubmit: (data: CreateOrEditBookingDto) => void;
}

const CreateOrEditBookingForm = ({
  isLoading,
  initialValues,
  onSubmit,
}: CreateOrEditBookingProps) => {
  const restaurantId = useSelector(
    (state: RootState) => state?.restaurant?.currentRestaurant?.id
  );
  const { is_authenticated, user } = useAuth();
  const userId = user?.id;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateOrEditBookingDto>({
    resolver: zodResolver(bookingSchema),
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        userId: Number(userId),
        restaurantId: Number(restaurantId),
        date: initialValues.date ? new Date(initialValues.date) : new Date(),
        startTime: initialValues.startTime
          ? new Date(initialValues.startTime)
          : new Date(),
        endTime: initialValues.endTime
          ? new Date(initialValues.endTime)
          : new Date(),
        guests: Number(initialValues.guests),
      });
    } else {
      reset({
        userId: Number(userId),
        restaurantId: Number(restaurantId),
        name: "",
        phone: "",
        email: "",
        date: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        guests: 0,
      });
    }
  }, [initialValues, reset]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [currentTimeField, setCurrentTimeField] = useState<
    "startTime" | "endTime"
  >("startTime");

  const handleTimeChange = (field: "startTime" | "endTime") => {
    setCurrentTimeField(field);
    setShowTimePicker(true);
  };

  const formatTime = (date: Date | undefined) => {
    return date ? moment(date).format("hh:mm A") : "";
  };

  return (
    <VStack>
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
                placeholder="Customer Name"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
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
        name="phone"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.phone}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Phone</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                placeholder="Phone Number"
                onChangeText={(text) => onChange(text.replace(/[^0-9]/g, ""))}
                onBlur={onBlur}
                value={value}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </Input>
            {errors.phone && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.phone.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.email}
            isRequired={false}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                placeholder="Email Address"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </Input>
            {errors.email && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.email.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="date"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.date}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Date</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                placeholder="dd/mm/yyyy"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value ? moment(value).format("DD/MM/YYYY") : ""}
                onPressIn={() => setShowDatePicker(true)}
              />
            </Input>
            {errors.date && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.date.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={control._formValues.date || new Date()}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setValue("date", selectedDate);
            }
          }}
        />
      )}

      <Controller
        name="startTime"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.startTime}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Start Time</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                placeholder="Start Time"
                onChangeText={onChange}
                onBlur={onBlur}
                value={formatTime(value)}
                onPressIn={() => handleTimeChange("startTime")}
              />
            </Input>
            {errors.startTime && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.startTime.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={control._formValues.startTime || new Date()}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setValue("startTime", selectedTime);
            }
          }}
        />
      )}

      <Controller
        name="endTime"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.endTime}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>End Time</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                placeholder="End Time"
                onChangeText={onChange}
                onBlur={onBlur}
                value={formatTime(value)}
                onPressIn={() => handleTimeChange("endTime")}
              />
            </Input>
            {errors.endTime && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.endTime.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={control._formValues.endTime || new Date()}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setValue("endTime", selectedTime);
            }
          }}
        />
      )}

      <Controller
        name="guests"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.guests}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Number of Guests</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                placeholder="Number of Guests"
                onChangeText={(text) => onChange(parseInt(text) || 0)}
                onBlur={onBlur}
                value={value?.toString()}
                keyboardType="numeric"
                maxLength={2}
              />
            </Input>
            {errors.guests && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.guests.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Button isDisabled={isLoading} onPress={handleSubmit(onSubmit)}>
        <ButtonText>Submit</ButtonText>
        {isLoading && <ButtonSpinner animating={isLoading} />}
      </Button>

      {errors.restaurantId && <Text>{errors.restaurantId.message}</Text>}
    </VStack>
  );
};

export default CreateOrEditBookingForm;
