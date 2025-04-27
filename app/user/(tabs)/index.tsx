import { useFindAllRestaurantsForUserQuery } from "@/features/restaurants/api/restaurant.api";
import { PAGE, PAGE_SIZE } from "@/constants/constants";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import RestaurantCardForUser from "@/features/restaurants/screens/RestaurantCardForUser";
import moment from "moment";
import HomeListHeader from "@/features/home/HomeListHeader";
import HomeListEmpty from "@/features/home/HomeListEmty";
import { useCallback, useEffect, useState } from "react";

export default function UserHome() {
  const [filterText, setFilterText] = useState("");
  const [debouncedFilterText, setDebouncedFilterText] = useState("");
  const [page, setPage] = useState(PAGE);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const { data, isLoading, isError, isFetching, refetch } =
    useFindAllRestaurantsForUserQuery({
      page: PAGE,
      limit: PAGE_SIZE,
      filterText: debouncedFilterText.trim(),
    });

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
  }, [isFetching, hasMoreData]);

  const renderFooter = useCallback(() => {
    return isFetching && page > 1 ? (
      <ActivityIndicator size="large" color="#0000ff" />
    ) : null;
  }, [isFetching, page]);

  if (isLoading && page === 1) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <FlatList
      data={data?.data?.results}
      renderItem={({ item }) => (
        <RestaurantCardForUser
          id={item.id ?? 0}
          uri={item.imageUrl ?? ""}
          name={item.name ?? ""}
          address={item.address ?? ""}
          openingTime={moment(item.openingTime).format("HH:mm")}
          closingTime={moment(item.closingTime).format("HH:mm")}
        />
      )}
      keyExtractor={(item) => (item.id ?? "").toString()}
      ListHeaderComponent={
        <HomeListHeader
          filterText={filterText}
          onFilterTextChange={handleFilterTextChange}
        />
      }
      ListEmptyComponent={HomeListEmpty}
      ListFooterComponent={renderFooter}
      refreshing={isManualRefreshing}
      refreshControl={
        <RefreshControl
          refreshing={isManualRefreshing}
          onRefresh={handleRefresh}
        />
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  );
}
