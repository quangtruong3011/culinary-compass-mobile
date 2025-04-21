import RestaurantDetailForUser from "@/features/restaurants/screens/RestaurantDetailForUser";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

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