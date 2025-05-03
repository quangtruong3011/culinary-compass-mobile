import { Stack } from "expo-router";
import { FlatList, RefreshControl } from "react-native";
import { useCallback, useState } from "react";
import BookingListEmptyForAdmin from "@/features/bookings/screens/BookingListEmptyForAdmin";
import BookingCardForAdmin from "@/features/bookings/screens/BookingCardForAdmin";
import { useFindAllBookingForAdminQuery } from "@/features/bookings/api/booking.api";
import { PAGE, PAGE_SIZE } from "@/constants/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function RestaurantBooking() {
  const restaurantId = useSelector(
    (state: RootState) => state?.restaurant?.currentRestaurant?.id
  );
  const [page, setPage] = useState(PAGE);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);

  const { data, isLoading, isError, refetch } = useFindAllBookingForAdminQuery({
    page: page,
    limit: PAGE_SIZE,
    filterText: "",
    restaurantId: restaurantId,
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
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Booking Management",
          headerTitleAlign: "center",
        }}
      />

      <FlatList
        data={data?.data.results}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: 32,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<BookingListEmptyForAdmin />}
        renderItem={({ item }) => (
          <BookingCardForAdmin
            id={item.id}
            name={item.name}
            phone={item.phone}
            email={item.email}
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
            numberOfSeats={item.guests}
            status={item.status}
          />
        )}
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
