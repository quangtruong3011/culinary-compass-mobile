import { Box } from "@/components/ui/box";
import { useCreateRestaurantMutation } from "@/features/restaurants/api/restaurant.api";
import { CreateOrEditRestaurantDto } from "@/features/restaurants/interfaces/restaurant.interface";
import CreateOrEditRestaurantForm from "@/features/restaurants/screens/CreateOrEditRestaurantForm";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";

export default function CreateRestauranScreen() {
  const [create, { isLoading, error }] = useCreateRestaurantMutation();

  const handleSubmit = async (data: CreateOrEditRestaurantDto) => {
    const imageUris = await Promise.all(
      data.images.map(async (uri) => {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        return `data:image/jpeg;base64,${base64}`;
      })
    );
    const payload = {
      ...data,
      openingTime: new Date(data.openingTime),
      closingTime: new Date(data.closingTime),
      images: imageUris,
    };

    try {
      await create(payload).unwrap();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Box className="justify-center items-center p-4">
          <Box className="w-full max-w-md">
            <CreateOrEditRestaurantForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </Box>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
