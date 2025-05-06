import CreateOrEditRestaurantForm from "@/features/restaurants/screens/CreateOrEditRestaurantForm";
import { ScrollView } from "react-native";
import { Stack } from "expo-router";
import { Box } from "@/components/ui/box";

export default function CreateRestauranScreen() {
  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Create Restaurant",
        }}
      />
      <Box
        style={{
          padding: 16,
          backgroundColor: "#fff",
        }}
      >
        <CreateOrEditRestaurantForm />
      </Box>
    </ScrollView>
  );
}
