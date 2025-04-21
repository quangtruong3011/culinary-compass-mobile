import { useFindRestaurantForUserQuery } from "@/features/restaurants/api/restaurant.api";
import RestaurantDetailForUser from "@/features/restaurants/screens/RestaurantDetailForUser";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError } = useFindRestaurantForUserQuery(id as string);

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