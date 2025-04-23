import { useCreateRestaurantMutation } from "@/features/restaurants/api/restaurant.api";
import CreateOrEditRestaurantForm from "@/features/restaurants/screens/CreateOrEditRestaurantForm";
import { ScrollView } from "react-native";
import * as FileSystem from "expo-file-system";
import { CreateOrEditRestaurantDto } from "@/features/restaurants/interfaces/create-or-edit-restaurant.interface";
import { Stack } from "expo-router";
import { LocalImage } from "@/features/restaurants/interfaces/restaurant-image.interface";

export default function CreateRestauranScreen() {
  const [create, { isLoading, error }] = useCreateRestaurantMutation();

  const handleSubmit = async (data: CreateOrEditRestaurantDto) => {
    const imageUris = await Promise.all(
      data.images.map(async (image) => {
        const base64 = await FileSystem.readAsStringAsync(
          (image as LocalImage).uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );
        return {
          uri: `data:image/jpeg;base64,${base64}`,
        };
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
    <ScrollView>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Create Restaurant",
        }}
      />

      <CreateOrEditRestaurantForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        mode="create"
      />
    </ScrollView>
  );
}
