import { VStack } from "@/components/ui/vstack";
import { restaurantSchema } from "@/lib/validation/restaurant-schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Districts,
  Provinces,
  Wards,
} from "../interfaces/restaurant.interface";
import { useEffect, useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Alert, AlertText } from "@/components/ui/alert";
import { MAX_IMAGES } from "@/constants/constants";
import { FlatList, ScrollView } from "react-native";
import RenderImageItem from "./RenderImageItem";
import provinces from "../../../shared/provinces.json";
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
import { ChevronDownIcon } from "@/components/ui/icon";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { CreateOrEditRestaurantDto } from "../interfaces/create-or-edit-restaurant.interface";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
} from "../api/restaurant.api";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";
import * as FileSystem from "expo-file-system";

const CreateOrEditRestaurantForm = () => {
  const toast = useToast();
  const restaurant = useSelector(
    (state: RootState) => state?.restaurant?.currentRestaurant
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateOrEditRestaurantDto>({
    resolver: zodResolver(restaurantSchema),
  });

  const [create, { isLoading: isCreating }] = useCreateRestaurantMutation();
  const [update, { isLoading: isUpdating }] = useUpdateRestaurantMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    if (restaurant) {
      reset({
        ...restaurant,
        website: restaurant.website || "",
        openingTime: moment(restaurant.openingTime).toDate(),
        closingTime: moment(restaurant.closingTime).toDate(),
      });
    }
  }, [restaurant, reset]);

  const images = watch("images") || [];
  const deletedImages = watch("deletedImages") || [];

  const [selectedProvince, setSelectedProvince] = useState<Provinces | null>(
    null
  );
  const [districts, setDistricts] = useState<Districts[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<Districts | null>(
    null
  );
  const [wards, setWards] = useState<Wards[]>([]);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isProvinceSelectOpen, setProvinceSelectOpen] = useState(false);
  const [isDistrictSelectOpen, setDistrictSelectOpen] = useState(false);
  const [isWardSelectOpen, setWardSelectOpen] = useState(false);
  const [currentTimeFiled, setCurrentTimeField] = useState<
    "openingTime" | "closingTime"
  >("openingTime");

  const handleTimeChange = (field: "openingTime" | "closingTime") => {
    setCurrentTimeField(field);
    setShowTimePicker(true);
  };

  const pickImages = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 0.8,
      selectionLimit: MAX_IMAGES - images.length,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImages = result.assets.map((asset) => ({
        imageUrl: asset.uri,
      }));
      setValue("images", [...images, ...newImages], {
        shouldValidate: true,
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const removedImage = newImages.splice(index, 1)[0];

    setValue("images", newImages);

    if (removedImage?.publicId) {
      setValue("deletedImages", [...deletedImages, removedImage], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (data: CreateOrEditRestaurantDto) => {
    try {
      // Convert local images to base64
      const updatedImages = await Promise.all(
        (images || []).map(async (image) =>
          image.imageUrl.startsWith("file://")
            ? {
                ...image,
                imageUrl: `data:image/jpeg;base64,${await FileSystem.readAsStringAsync(
                  image.imageUrl,
                  {
                    encoding: FileSystem.EncodingType.Base64,
                  }
                )}`,
              }
            : image
        )
      );
      data.images = updatedImages;

      // Decide whether to create or update
      if (restaurant) {
        await update({ id: restaurant?.id as number, body: data }).unwrap();
      } else {
        await create(data).unwrap();
        reset({});
      }

      toast.show({
        placement: "top right",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="success" variant="outline">
            <VStack space="xs">
              <ToastTitle>Success</ToastTitle>
              <ToastDescription>
                {restaurant
                  ? "Restaurant updated successfully"
                  : "Restaurant created successfully"}
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
      // Optionally reset form or redirect here
      // reset();
      // navigation.goBack(); // nếu muốn tự động quay lại màn trước
    } catch (error) {
      toast.show({
        placement: "top right",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="outline">
            <VStack space="xs">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>
                {restaurant
                  ? "Failed to update restaurant"
                  : "Failed to create restaurant"}
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    }
  };

  return (
    <VStack>
      <>
        <Text className="text-lg font-semibold mb-2 text-pink-500">Photos</Text>
        <Text className="text-sm text-gray-500" style={{ marginBottom: 8 }}>
          Note your first image will be cover later
        </Text>
        <Controller
          name="images"
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl
              isInvalid={!!errors.images}
              isRequired={true}
              isDisabled={isLoading}
            >
              <FlatList
                data={images}
                renderItem={({ item, index }) => (
                  <RenderImageItem
                    imageUrl={item.imageUrl}
                    index={index}
                    removeImage={removeImage}
                  />
                )}
                keyExtractor={(_, index) => index.toString()}
                numColumns={3}
                scrollEnabled={false}
              />

              <Button
                onPress={pickImages}
                isDisabled={isLoading || images.length >= MAX_IMAGES}
                className="mt-2"
                variant="outline"
              >
                <ButtonText>
                  {images.length >= MAX_IMAGES
                    ? `Max ${MAX_IMAGES} images selected`
                    : `Add Images (${images.length}/${MAX_IMAGES})`}
                </ButtonText>
              </Button>

              {errors.images && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.images.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
              {images.length >= MAX_IMAGES && (
                <FormControlHelper className="mt-2">
                  <FormControlHelperText>
                    You can only select up to {MAX_IMAGES} images.
                  </FormControlHelperText>
                </FormControlHelper>
              )}
            </FormControl>
          )}
        />
      </>

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
        name="province"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.province}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Province</FormControlLabelText>
            </FormControlLabel>
            <Select>
              <SelectTrigger variant="outline" size="lg">
                <SelectInput
                  placeholder="Select Province"
                  value={value || ""}
                />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <ScrollView
                    style={{
                      maxHeight: 450,
                      width: "100%",
                    }}
                    nestedScrollEnabled={true}
                  >
                    {provinces.map((province) => (
                      <SelectItem
                        key={province.code}
                        label={province.name}
                        value={province.name}
                        onPress={() => {
                          onChange(province.name);
                          setSelectedProvince(province);
                          setDistricts(province.districts || []);
                          setSelectedDistrict(null);
                          setWards([]);
                          onBlur();
                          setProvinceSelectOpen(false);
                        }}
                      />
                    ))}
                  </ScrollView>
                </SelectContent>
              </SelectPortal>
            </Select>
            {errors.province && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.province.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="district"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.district}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>District</FormControlLabelText>
            </FormControlLabel>
            <Select>
              <SelectTrigger variant="outline" size="lg">
                <SelectInput
                  placeholder="Select District"
                  value={value || ""}
                />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <ScrollView
                    style={{ maxHeight: 450, width: "100%" }}
                    nestedScrollEnabled={true}
                  >
                    {districts.map((district) => (
                      <SelectItem
                        key={district.code}
                        label={district.name}
                        value={district.name}
                        onPress={() => {
                          onChange(district.name);
                          setSelectedDistrict(district);
                          setWards(district.wards || []);
                          onBlur();
                          setDistrictSelectOpen(false);
                        }}
                      />
                    ))}
                  </ScrollView>
                </SelectContent>
              </SelectPortal>
            </Select>
            {errors.district && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.district.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="ward"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.ward}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Ward</FormControlLabelText>
            </FormControlLabel>
            <Select>
              <SelectTrigger variant="outline" size="lg">
                <SelectInput placeholder="Select Ward" value={value || ""} />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <ScrollView
                    style={{ maxHeight: 450, width: "100%" }}
                    nestedScrollEnabled={true}
                  >
                    {wards.map((ward) => (
                      <SelectItem
                        key={ward.code}
                        label={ward.name}
                        value={ward.name}
                        onPress={() => {
                          onChange(ward.name);
                          onBlur();
                          setWardSelectOpen(false);
                        }}
                      />
                    ))}
                  </ScrollView>
                </SelectContent>
              </SelectPortal>
            </Select>
            {errors.ward && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.ward.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="address"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.address}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Address</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            </Input>
            {errors.address && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.address.message}
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
                maxLength={12}
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
        name="website"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.website}
            isRequired={false}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Website</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                onChangeText={(text) => onChange(text || "")}
                onBlur={onBlur}
                value={value || ""}
              />
            </Input>
            {errors.website && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.website.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />

      <HStack className="justify-between items-center">
        <Controller
          name="openingTime"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              isInvalid={!!errors.openingTime}
              isRequired={true}
              isDisabled={isLoading}
            >
              <FormControlLabel>
                <FormControlLabelText>Opening Time</FormControlLabelText>
              </FormControlLabel>
              <Input variant="outline" size="lg">
                <InputField
                  type="text"
                  placeholder="hh:mm AM/PM"
                  value={value && moment(value).format("hh:mm A")}
                  onChange={onChange}
                  onBlur={onBlur}
                  onPressIn={() => handleTimeChange("openingTime")}
                />
              </Input>
              {errors.openingTime && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.openingTime.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />

        <Controller
          name="closingTime"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              isInvalid={!!errors.closingTime}
              isRequired={true}
              isDisabled={isLoading}
            >
              <FormControlLabel>
                <FormControlLabelText>Closing Time</FormControlLabelText>
              </FormControlLabel>
              <Input variant="outline" size="lg">
                <InputField
                  type="text"
                  placeholder="hh:mm AM/PM"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value && moment(value).format("hh:mm A")}
                  onPressIn={() => handleTimeChange("closingTime")}
                />
              </Input>
              {errors.closingTime && (
                <FormControlError>
                  <FormControlErrorText>
                    {errors.closingTime.message}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />
      </HStack>

      {showTimePicker && (
        <DateTimePicker
          value={control._formValues[currentTimeFiled] || new Date()}
          mode="time"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowTimePicker(false);
            if (selectedDate) {
              setValue(currentTimeFiled, selectedDate);
            }
          }}
        />
      )}

      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            isInvalid={!!errors.description}
            isRequired={true}
            isDisabled={isLoading}
          >
            <FormControlLabel>
              <FormControlLabelText>Description</FormControlLabelText>
            </FormControlLabel>
            <Textarea
              isReadOnly={false}
              isDisabled={isLoading}
              isInvalid={!!errors.description}
            >
              <TextareaInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                numberOfLines={5}
                maxLength={256}
              />
            </Textarea>
            {errors.description && (
              <FormControlError>
                <FormControlErrorText>
                  {errors.description.message}
                </FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>
        )}
      />
      {/* {Object.values(errors).map((error, index) => (
        <Text key={index}>{error?.message}</Text>
      ))} */}
      <Button
        onPress={handleSubmit(onSubmit)}
        isDisabled={isLoading}
        style={{
          marginTop: 16,
          backgroundColor: "#FF6F61",
          borderRadius: 8,
        }}
      >
        {isLoading && <ButtonSpinner animating={isLoading} />}
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
};

export default CreateOrEditRestaurantForm;
