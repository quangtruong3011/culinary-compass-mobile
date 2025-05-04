import { PAGE, PAGE_SIZE } from "@/constants/constants";
import { useFindAllBookingForUserQuery } from "@/features/bookings/api/booking.api";
import BookingCardForUser from "@/features/bookings/screens/BookingCardForUser";
import BookingListHeader from "@/features/bookings/screens/BookingListHeader";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";

export default function BookingScreen() {
  const [page, setPage] = useState(PAGE);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const { data, isLoading, isError, refetch } = useFindAllBookingForUserQuery({
    page: PAGE,
    limit: PAGE_SIZE,
    filterText: "",
  });

  const totalPages = data?.data?.totalPages || 0;
  const hasMoreData = page < totalPages;

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
    if (!isLoading && hasMoreData) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMoreData]);

  return (
    <>
      <FlatList
        data={data?.data.results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookingCardForUser
            id={item.id}
            restaurantId={item.restaurantId}
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
            numberOfSeats={item.guests}
            status={item.status}
            isCommented={item.isCommented}
          />
        )}
        ListHeaderComponent={BookingListHeader}
        refreshing={isLoading}
        refreshControl={
          <RefreshControl
            refreshing={isManualRefreshing}
            onRefresh={handleRefresh}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </>
  );
}
