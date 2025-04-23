import { useFindOneRestaurantForAdminQuery } from "@/features/restaurants/api/restaurant.api";
import CreateOrEditRestaurantForm from "@/features/restaurants/screens/CreateOrEditRestaurantForm";
import { RootState } from "@/store/store";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

export default function RestaurantInfo() {
  const restaurantId = useSelector(
    (state: RootState) => state.restaurant?.currentRestaurant?.id ?? null
  );

  const { data, isLoading, isError, refetch } =
    useFindOneRestaurantForAdminQuery(restaurantId as number);

  const handleSubmit = async () => {};

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Information",
        }}
      />
      <CreateOrEditRestaurantForm
        initialValues={data?.data}
        isLoading={isLoading}
        mode="edit"
        onSubmit={handleSubmit}
      />
    </ScrollView>
  );
}
