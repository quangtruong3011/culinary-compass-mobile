import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Image } from "expo-image";
import { Controller, useForm } from "react-hook-form";
import { CreateOrEditUserDto } from "../interfaces/create-or-edit-user.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/validation/user-schema";
import { Input, InputField } from "@/components/ui/input";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { useUpdateUserMutation } from "../api/user.api";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { ChevronDownIcon, EditIcon } from "@/components/ui/icon";
import {
  Button,
  ButtonIcon,
  ButtonSpinner,
  ButtonText,
} from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import * as ImagePicker from "expo-image-picker";
import { User } from "../interfaces/user.interface";
import * as FileSystem from "expo-file-system";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

const CreateOrEditUser = () => {
  const user = useSelector((state: RootState) => state.auth?.user) as User;
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setValue,
    watch,
    reset,
  } = useForm<CreateOrEditUserDto>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        birthOfDate: moment(user.birthOfDate).toDate(),
        gender: user.gender || "",
        imageUrl: user.imageUrl,
      });
    }
  }, [user, reset]);

  const avtUrl = watch("imageUrl") || "https://placehold.co/400x400";
  const [showDateTimePicker, setShowDateTimePicker] = useState<boolean>(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setValue("imageUrl", result.assets[0].uri);
    }
  };

  const [update, { isLoading, isSuccess }] = useUpdateUserMutation();

  const onSubmit = async (data: CreateOrEditUserDto) => {
    // Convert the image URL to a base64 string if it's a local file
    if (data.imageUrl && data.imageUrl.startsWith("file://")) {
      const base64 = await FileSystem.readAsStringAsync(data.imageUrl, {
        encoding: FileSystem.EncodingType.Base64,
      });
      data.imageUrl = `data:image/jpeg;base64,${base64}`;
    }

    try {
      await update({ id: user.id as number, body: data }).unwrap();

      toast.show({
        placement: "top right",
        duration: 3000,
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="success" variant="outline">
            <VStack space="xs">
              <ToastTitle>Updated successfully</ToastTitle>
              <ToastDescription>
                User information has been saved
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    } catch (error: any) {
      toast.show({
        placement: "top right",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="outline">
            <VStack space="xs">
              <ToastTitle>An error occurred</ToastTitle>
              <ToastDescription>
                {error?.data?.message || "Unable to update information"}
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    }
  };

  return (
    <VStack className="p-4 space-y-4">
      <HStack className="justify-center py-4">
        <Box style={{ position: "relative" }}>
          <Image
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              objectFit: "cover",
            }}
            source={{ uri: avtUrl }}
          />
          <Button
            size="xs"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 4,
            }}
            onPress={pickImage}
          >
            <ButtonIcon as={EditIcon} size="sm" color="black" />
          </Button>
        </Box>
      </HStack>

      <Controller
        name="name"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { isTouched, error },
        }) => (
          <FormControl
            isInvalid={!!errors.name && (isTouched || !!errors.name)}
            isRequired={true}
            isDisabled={isLoading}
            className="mb-4"
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
                autoCapitalize="words"
                maxLength={50}
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
        name="email"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { isTouched, error },
        }) => (
          <FormControl
            isInvalid={!!errors.email && (isTouched || !!errors.email)}
            isRequired={true}
            isDisabled={true}
            className="mb-4"
          >
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input>
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
        name="phone"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { isTouched, error },
        }) => (
          <FormControl
            isInvalid={!!errors.phone && (isTouched || !!errors.phone)}
            isRequired={true}
            isDisabled={isLoading}
            className="mb-4"
          >
            <FormControlLabel>
              <FormControlLabelText>Phone</FormControlLabelText>
            </FormControlLabel>
            <Input>
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
        name="birthOfDate"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { isTouched, error },
        }) => (
          <FormControl
            isInvalid={
              !!errors.birthOfDate && (isTouched || !!errors.birthOfDate)
            }
            isRequired={true}
            isDisabled={isLoading}
            className="mb-4"
          >
            <FormControlLabel>
              <FormControlLabelText>Birth Date</FormControlLabelText>
            </FormControlLabel>

            <Input>
              <InputField
                type="text"
                onChange={onChange}
                onBlur={onBlur}
                value={value && moment(value).format("DD/MM/YYYY")}
                onPressIn={() => setShowDateTimePicker(true)}
              />
            </Input>
            {errors.birthOfDate && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.birthOfDate.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      {showDateTimePicker && (
        <Box className="absolute bottom-0 left-0 right-0 bg-white z-10">
          <DateTimePicker
            value={new Date(watch("birthOfDate") || new Date())}
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            onChange={(event, date) => {
              setShowDateTimePicker(false);
              if (date) {
                if (moment(date).isAfter(moment())) {
                  return;
                }
                setValue("birthOfDate", date);
              }
            }}
          />
        </Box>
      )}

      <Controller
        name="gender"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { isTouched, error },
        }) => (
          <FormControl
            isInvalid={!!errors.gender && (isTouched || !!errors.gender)}
            isDisabled={isLoading}
            isRequired={true}
            className="mb-6"
          >
            <FormControlLabel>
              <FormControlLabelText>Gender</FormControlLabelText>
            </FormControlLabel>
            <Select>
              <SelectTrigger variant="outline" className="border-gray-300">
                <SelectInput
                  placeholder="Select gender"
                  value={value}
                  onPressIn={() => {}}
                />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {["male", "female", "other"].map((option) => (
                    <SelectItem
                      key={option}
                      label={option.charAt(0).toUpperCase() + option.slice(1)}
                      value={option}
                      onPress={() => {
                        onChange(option);
                        onBlur();
                      }}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
            {errors.gender && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.gender.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Button
        variant="outline"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        className="mt-6 bg-blue-500"
      >
        {isLoading && <ButtonSpinner animating={isLoading} />}
        <ButtonText className="text-white">Save Changes</ButtonText>
      </Button>
    </VStack>
  );
};

export default CreateOrEditUser;
