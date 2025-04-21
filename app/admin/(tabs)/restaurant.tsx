import { useFindAllRestaurantsForAdminQuery } from "@/features/restaurants/api/restaurant.api";
import RestaurantCardForAdmin from "@/features/restaurants/screens/RestaurantCardForAdmin";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import moment from "moment";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";

export default function RestaurantAdminScreen() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading, isError, refetch, isFetching } =
    useFindAllRestaurantsForAdminQuery({
      page: page,
      limit: limit,
      filterText: "",
    });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    refetch().finally(() => {
      setRefreshing(false);
    });
  }, [refetch]);

  const loadMore = useCallback(() => {
    if (
      !isLoading &&
      data?.data &&
      page < data.data.totalPages &&
      !isFetching
    ) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, data, page, isFetching]);

  const onEndReached = useCallback(() => {
    loadMore();
  }, [loadMore]);

  return (
    <FlatList
      data={data?.data.results}
      renderItem={({ item }) => (
        <RestaurantCardForAdmin
          id={item.id}
          uri={item.imageUrl}
          name={item.name}
          address={item.address}
          openingTime={moment(item.openingTime).format("HH:mm")}
          closingTime={moment(item.closingTime).format("HH:mm")}
        />
      )}
      ListHeaderComponent={() => <Link href={`/admin/restaurant/create`}>Restaurants</Link>}
      ListEmptyComponent={!isLoading ? <Text>No restaurants found</Text> : null}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{ paddingBottom: 20 }}
      ListFooterComponent={
        isFetching && page > 1 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : null
      }
    />
  );
}
