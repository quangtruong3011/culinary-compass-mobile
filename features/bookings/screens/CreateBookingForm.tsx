import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form";
import { bookingSchema } from "@/lib/validation/bookingSchema";
import { VStack } from "@/components/ui/vstack";
import { FormControl, FormControlError, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { CreateBookingDto } from "../interfaces/create-booking.interface";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useCreateBookingMutation } from "../api/booking.api";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";


const CreateBookingForm = () => {
  const { control, handleSubmit, formState: { errors }, setValue, } = useForm<CreateBookingDto>({
    resolver: zodResolver(bookingSchema),
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [currentTimeField, setCurrentTimeField] = useState<"startTime" | "endTime">("startTime");

  const handleTimeChange = (field: "startTime" | "endTime") => {
    setCurrentTimeField(field);
    setShowTimePicker(true);
  }

  const formatTime = (date: Date | undefined) => {
    if (!date) return "hh:mm AM/PM";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [create, { isLoading }] = useCreateBookingMutation();

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
                placeholder="Restaurant Name"
                onChangeText={onChange}
                onBlur={onBlur}
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
                onChangeText={onChange}
                onBlur={onBlur}
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
                value={value ? value.toLocaleDateString() : ""}
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
              control.setValue("date", selectedDate);
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
          value={control._formValues.endTime || new Date()}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              control.setValue("endTime", selectedTime);
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
                onChangeText={onChange}
                onBlur={onBlur}
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

      <Button isDisabled={isLoading} >
        <ButtonText>Submit</ButtonText>
        {isLoading && <ButtonSpinner animating={isLoading} />}
      </Button>


    </VStack >
  )
}

export default CreateBookingForm;