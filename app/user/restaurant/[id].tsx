import { Text } from "@/components/ui/text";
import { useFindRestaurantForUserQuery } from "@/features/restaurants/api/restaurant.api";
import { Stack, useLocalSearchParams } from "expo-router";

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError } = useFindRestaurantForUserQuery(
    id as string
  );
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
        }}
      />

      <Text>Restaurant Detail</Text>
    </>
  );
}
