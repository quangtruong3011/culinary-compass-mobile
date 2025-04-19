import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useFindAllRestaurantsForAdminQuery } from "@/features/restaurants/api/restaurant.api";
import RestaurantListForAdmin from "@/features/restaurants/screens/RestaurantListForAdmin";
import { RootState } from "@/store/store";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function RestaurantScreen() {
  const { data, isLoading, refetch } = useFindAllRestaurantsForAdminQuery({});
  const restaurants = data?.data?.results;
  console.log("restaurants", restaurants);
  const router = useRouter();

  return (
    <>
      <Button onPress={() => router.push("/admin/restaurant/create")}>
        <ButtonText>Create Restaurant</ButtonText>
      </Button>
      <RestaurantListForAdmin restaurantList={restaurants} isLoading={isLoading} />
    </>
  );
}
