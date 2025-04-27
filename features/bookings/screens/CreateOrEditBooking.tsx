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
import { CreateOrEditBookingDto } from "../interfaces/create-or-edit-booking.interface";
import moment from "moment";
import {
  useCreateBookingMutation,
  useUpdateBookingMutation,
} from "../api/booking.api";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import { useRouter } from "expo-router";
import { Text } from "@/components/ui/text";

const CreateOrEditBooking = () => {
  const toast = useToast();
  const router = useRouter();
  const { is_authenticated } = useSelector((state: RootState) => state?.auth);
  const restaurantId = useSelector(
    (state: RootState) => state?.restaurant?.currentRestaurant?.id
  );
  const booking = useSelector(
    (state: RootState) => state?.booking?.currentBooking
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CreateOrEditBookingDto>({
    resolver: zodResolver(bookingSchema),
  });

  const [create, { isLoading: isCreating }] = useCreateBookingMutation();
  const [update, { isLoading: isUpdating }] = useUpdateBookingMutation();
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (booking) {
      reset({
        restaurantId: Number(booking.restaurantId),
        name: booking.name,
        phone: booking.phone,
        email: booking.email,
        date: new Date(booking.date),
        startTime: new Date(booking.startTime),
        endTime: new Date(booking.endTime),
        guests: Number(booking.guests),
      });
    } else {
      reset({
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
  }, [booking, reset]);

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

  const onSubmit = async (data: CreateOrEditBookingDto) => {
    try {
      if (booking) {
        await update({
          id: booking.id,
          body: data,
        }).unwrap();
        toast.show({
          placement: "top right",
          duration: 3000,
          render: ({ id }) => (
            <Toast nativeID={`toast-${id}`} action="success" variant="outline">
              <VStack space="xs">
                <ToastTitle>Updated successfully</ToastTitle>
                <ToastDescription>
                  Booking information has been updated
                </ToastDescription>
              </VStack>
            </Toast>
          ),
        });
      } else {
        await create(data).unwrap();
        toast.show({
          placement: "top right",
          duration: 3000,
          render: ({ id }) => (
            <Toast nativeID={`toast-${id}`} action="success" variant="outline">
              <VStack space="xs">
                <ToastTitle>Created successfully</ToastTitle>
                <ToastDescription>
                  Booking information has been saved
                </ToastDescription>
              </VStack>
            </Toast>
          ),
        });
        reset();
      }
    } catch (error) {}
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
                onChangeText={onChange}
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
          display="calendar"
          is24Hour={true}
          minimumDate={new Date()}
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
          display="spinner"
          is24Hour={true}
          minimumDate={new Date()}
          minuteInterval={15}
          value={control._formValues[currentTimeField] || new Date()}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setValue(currentTimeField, selectedTime);
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
            <Input>
              <InputField
                type="text"
                placeholder="Number of Guests"
                onChangeText={(text) => onChange(parseInt(text) || 0)}
                onBlur={onBlur}
                value={value?.toString()}
                keyboardType="phone-pad"
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

      {is_authenticated ? (
        <Button
          className="mt-4"
          variant="solid"
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText>Save</ButtonText>
          {isLoading && <ButtonSpinner animating={isLoading} />}
        </Button>
      ) : (
        <Button
          className="mt-4"
          variant="solid"
          onPress={() => router.push("/(auth)/login")}
        >
          <ButtonText>Login to save</ButtonText>
        </Button>
      )}
    </VStack>
  );
};

export default CreateOrEditBooking;
