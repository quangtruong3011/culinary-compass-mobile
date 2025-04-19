import { VStack } from "@/components/ui/vstack";
import { restaurantSchema } from "@/lib/validation/restaurantSchema";
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
  CreateOrEditRestaurantDto,
  CreateOrEditRestaurantFormProps,
  Districts,
  Provinces,
  Wards,
} from "../interfaces/restaurant.interface";
import { useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { Alert, AlertText } from "@/components/ui/alert";
import { MAX_IMAGES } from "@/constants/constants";
import { FlatList, ScrollView } from "react-native";
import RenderImageItem from "./RenserImageItem";
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

const CreateOrEditRestaurantForm = ({
  onSubmit,
  isLoading,
}: CreateOrEditRestaurantFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateOrEditRestaurantDto>({
    resolver: zodResolver(restaurantSchema),
  });

  const images = watch("images") || [];

  const [selectedProvince, setSelectedProvince] = useState<Provinces | null>(
    null
  );
  const [districts, setDistricts] = useState<Districts[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<Districts | null>(
    null
  );
  const [wards, setWards] = useState<Wards[]>([]);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentTimeFiled, setCurrentTimeField] = useState<
    "openingTime" | "closingTime"
  >("openingTime");

  const handleTimeChange = (field: "openingTime" | "closingTime") => {
    setCurrentTimeField(field);
    setShowTimePicker(true);
  };

  const formatTime = (date: Date | undefined) => {
    if (!date) return "hh:mm AM/PM";
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pickImages = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      return (
        <Alert>
          <AlertText>
            Sorry, we need camera permissions to make this work!
          </AlertText>
        </Alert>
      );
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: MAX_IMAGES - images.length,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImages = [...images, ...result.assets.map((asset) => asset.uri)];
      setValue("images", newImages.slice(0, MAX_IMAGES));
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setValue("images", newImages);
  };

  return (
    <VStack>
      <Box>
        <Text className="text-lg font-semibold mb-2 text-pink-500">Photos</Text>
        <Text className="text-sm text-gray-500">
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
              {images.length > 0 && (
                <FlatList
                  data={images}
                  renderItem={({ item, index }) => (
                    <RenderImageItem
                      item={item}
                      index={index}
                      removeImage={removeImage}
                    />
                  )}
                  keyExtractor={(item, index) => item + index}
                  numColumns={3}
                  contentContainerStyle={{ alignItems: "flex-start" }}
                  scrollEnabled={false}
                />
              )}

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
      </Box>

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
                placeholder="Restaurant Address"
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
                placeholder="Restaurant Phone"
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
                  value={formatTime(value)}
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
                  value={formatTime(value)}
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

      <Button
        onPress={handleSubmit(onSubmit)}
        isDisabled={isLoading}
        className="mt-4"
      >
        <ButtonSpinner animating={isLoading} />
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
};

export default CreateOrEditRestaurantForm;
