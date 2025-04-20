import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useFindAllRestaurantsForAdminQuery } from "@/features/restaurants/api/restaurant.api";
import RestaurantListForAdmin from "@/features/restaurants/screens/RestaurantListForAdmin";
import { RootState } from "@/store/store";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useSelector } from "react-redux";

export default function RestaurantScreen() {
  const { data, isLoading, refetch } = useFindAllRestaurantsForAdminQuery({});
  const restaurants = data?.data?.results;
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    refetch().then(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Button onPress={() => router.push("/admin/restaurant/create")}>
        <ButtonText>Create Restaurant</ButtonText>
      </Button>
      <RestaurantListForAdmin
        restaurantList={restaurants}
        isLoading={isLoading}
      />
    </ScrollView>
  );
}
