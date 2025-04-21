import RestaurantDetailForUser from "@/features/restaurants/screens/RestaurantDetailForUser";
import { Stack, useLocalSearchParams } from "expo-router";

export default function RestaurantDetailForUserScreen() {
  const { id } = useLocalSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />

      <RestaurantDetailForUser id={id as string} />
    </>
  );
}
