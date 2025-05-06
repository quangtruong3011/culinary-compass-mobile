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
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateOrEditUser = () => {
  const user = useSelector((state: RootState) => state.auth?.user);
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
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
        birthOfDate:
          user.birthOfDate !== null
            ? moment(user.birthOfDate).toDate()
            : moment().toDate(),
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
    if (data.imageUrl && data.imageUrl.startsWith("file://")) {
      const base64 = await FileSystem.readAsStringAsync(data.imageUrl, {
        encoding: FileSystem.EncodingType.Base64,
      });
      data.imageUrl = `data:image/jpeg;base64,${base64}`;
    }

    try {
      await update({ id: user?.id as number, body: data }).unwrap();

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
    <SafeAreaView style={styles.container}>
      <VStack style={styles.content}>
        {/* Avatar Section */}
        <Box style={styles.avatarContainer}>
          <Image
            style={styles.avatarImage}
            source={{ uri: avtUrl }}
            transition={200}
          />
          <Button size="sm" style={styles.editAvatarButton} onPress={pickImage}>
            <ButtonIcon as={EditIcon} size="sm" color="white" />
          </Button>
        </Box>

        {/* Form Fields */}
        <VStack style={styles.formContainer}>
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
                style={styles.formControl}
              >
                <FormControlLabel>
                  <FormControlLabelText style={styles.label}>
                    Name
                  </FormControlLabelText>
                </FormControlLabel>
                <Input style={styles.input}>
                  <InputField
                    style={styles.inputField}
                    type="text"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    autoCapitalize="words"
                    maxLength={50}
                    placeholder="Enter your full name"
                  />
                </Input>
                {errors.name && (
                  <FormControlError>
                    <FormControlErrorText style={styles.errorText}>
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
                style={styles.formControl}
              >
                <FormControlLabel>
                  <FormControlLabelText style={styles.label}>
                    Email
                  </FormControlLabelText>
                </FormControlLabel>
                <Input style={styles.input}>
                  <InputField
                    style={styles.inputField}
                    type="text"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Your email address"
                  />
                </Input>
                {errors.email && (
                  <FormControlError>
                    <FormControlErrorText style={styles.errorText}>
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
                style={styles.formControl}
              >
                <FormControlLabel>
                  <FormControlLabelText style={styles.label}>
                    Phone
                  </FormControlLabelText>
                </FormControlLabel>
                <Input style={styles.input}>
                  <InputField
                    style={styles.inputField}
                    type="text"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    keyboardType="phone-pad"
                    maxLength={10}
                    placeholder="Enter phone number"
                  />
                </Input>
                {errors.phone && (
                  <FormControlError>
                    <FormControlErrorText style={styles.errorText}>
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
                style={styles.formControl}
              >
                <FormControlLabel>
                  <FormControlLabelText style={styles.label}>
                    Birth Date
                  </FormControlLabelText>
                </FormControlLabel>

                <Input style={styles.input}>
                  <InputField
                    style={styles.inputField}
                    type="text"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value && moment(value).format("DD/MM/YYYY")}
                    onPressIn={() => setShowDateTimePicker(true)}
                    placeholder="Select your birth date"
                  />
                </Input>
                {errors.birthOfDate && (
                  <FormControlError>
                    <FormControlErrorText style={styles.errorText}>
                      {errors.birthOfDate.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>
            )}
          />

          {showDateTimePicker && (
            <Box style={styles.datePickerContainer}>
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
                style={styles.formControl}
              >
                <FormControlLabel>
                  <FormControlLabelText style={styles.label}>
                    Gender
                  </FormControlLabelText>
                </FormControlLabel>
                <Select>
                  <SelectTrigger variant="outline" style={styles.selectTrigger}>
                    <SelectInput
                      style={styles.selectInput}
                      placeholder="Select gender"
                      value={value}
                      onPressIn={() => {}}
                    />
                    <SelectIcon
                      style={styles.selectIcon}
                      as={ChevronDownIcon}
                    />
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent style={styles.selectContent}>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      {["male", "female", "other"].map((option) => (
                        <SelectItem
                          key={option}
                          label={
                            option.charAt(0).toUpperCase() + option.slice(1)
                          }
                          value={option}
                          onPress={() => {
                            onChange(option);
                            onBlur();
                          }}
                          style={styles.selectItem}
                        />
                      ))}
                    </SelectContent>
                  </SelectPortal>
                </Select>
                {errors.gender && (
                  <FormControlError>
                    <FormControlErrorText style={styles.errorText}>
                      {errors.gender.message}
                    </FormControlErrorText>
                  </FormControlError>
                )}
              </FormControl>
            )}
          />

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={isLoading}
            style={styles.submitButton}
          >
            {isLoading && <ButtonSpinner animating={isLoading} color="white" />}
            <ButtonText style={styles.submitButtonText}>
              Save Changes
            </ButtonText>
          </Button>
        </VStack>
      </VStack>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 32,
    position: "relative",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#e9ecef",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: "30%",
    backgroundColor: "#4a42e8",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formContainer: {
    flex: 1,
  },
  formControl: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
  },
  inputField: {
    padding: 12,
    fontSize: 16,
    color: "#212529",
  },
  selectTrigger: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 8,
    height: 48,
  },
  selectInput: {
    padding: 12,
    fontSize: 16,
    color: "#212529",
  },
  selectIcon: {
    color: "#6c757d",
    marginRight: 12,
  },
  selectContent: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  selectItem: {
    padding: 12,
  },
  datePickerContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: "#4a42e8",
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    marginTop: 24,
    shadowColor: "#4a42e8",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CreateOrEditUser;
