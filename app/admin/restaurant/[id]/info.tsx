import CreateOrEditRestaurantForm from "@/features/restaurants/screens/CreateOrEditRestaurantForm";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function RestaurantInfo() {
  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Information",
        }}
      />
      <CreateOrEditRestaurantForm />
    </ScrollView>
  );
}
