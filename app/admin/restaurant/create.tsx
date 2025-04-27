import CreateOrEditRestaurantForm from "@/features/restaurants/screens/CreateOrEditRestaurantForm";
import { ScrollView } from "react-native";
import { Stack } from "expo-router";

export default function CreateRestauranScreen() {
  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Create Restaurant",
        }}
      />

      <CreateOrEditRestaurantForm />
    </ScrollView>
  );
}
