import { useFindAllRestaurantsForAdminQuery } from "@/features/restaurants/api/restaurant.api";
import RestaurantCardForAdmin from "@/features/restaurants/screens/RestaurantCardForAdmin";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import moment from "moment";
import { PAGE, PAGE_SIZE } from "@/constants/constants";
import RestaurantListHeader from "@/features/restaurants/screens/RestaurantListHeader";
import RestaurantListEmpty from "@/features/restaurants/screens/RestaurantListEmpty";
import { useFocusEffect } from "expo-router";

export default function RestaurantAdminScreen() {
  const [filterText, setFilterText] = useState("");
  const [debouncedFilterText, setDebouncedFilterText] = useState("");
  const [page, setPage] = useState(PAGE);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const { data, isLoading, isFetching, refetch } =
    useFindAllRestaurantsForAdminQuery({
      page: page,
      limit: PAGE_SIZE,
      filterText: debouncedFilterText,
    });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const totalPages = data?.data?.totalPages || 0;
  const hasMoreData = page < totalPages;

  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilterText(filterText);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [filterText]);

  const handleRefresh = useCallback(async () => {
    setIsManualRefreshing(true);
    setPage(1);
    try {
      await refetch();
    } finally {
      setIsManualRefreshing(false);
    }
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (!isFetching && hasMoreData) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMoreData]);

  return (
    <FlatList
      data={data?.data?.results}
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
      ListHeaderComponent={
        <RestaurantListHeader
          filterText={filterText}
          onFilterTextChange={handleFilterTextChange}
        />
      }
      ListEmptyComponent={<RestaurantListEmpty />}
      keyExtractor={(item) => (item.id ?? "").toString()}
      refreshControl={
        <RefreshControl
          refreshing={isManualRefreshing}
          onRefresh={handleRefresh}
        />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        isFetching && page > 1 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : null
      }
    />
  );
}
