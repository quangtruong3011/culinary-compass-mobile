import { Stack } from "expo-router";
import { FlatList, RefreshControl } from "react-native";
import { useCallback, useState } from "react";
<<<<<<< Updated upstream
import { Badge, BadgeText } from "@/components/ui/badge";
import colors from "tailwindcss/colors";
import {  useFindAllBookingForAdminQuery, useUpdateBookingStatusMutation } from "@/features/bookings/api/booking.api";
import Booking from "../../booking";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import BookingCardForAdmin, { BookingStatus } from "@/features/bookings/screens/BookingCardForAdmin";

const PASE_SIZE=10;

export default function RestaurantBooking() {

  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const restaurant = useSelector((state: RootState) => state.restaurant.currentRestaurant);

    const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      // In a real app, you would fetch updated data here
    }, 1500);
  }, []);

  const { data, isLoading, isError, refetch, isFetching } =
    useFindAllBookingForAdminQuery({
      page: page,
      limit: PASE_SIZE,
      filterText: "",
      restaurantId: restaurant?.id as number,
    }, { refetchOnMountOrArgChange: true });

  const bookings = data?.data.results || [];
=======
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
>>>>>>> Stashed changes

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Booking Management",
          headerTitleAlign: "center",
        }}
      />

<<<<<<< Updated upstream
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" />
        </View>
      )}

=======
>>>>>>> Stashed changes
      <FlatList
        data={data?.data.results}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: 32,
          paddingTop: 16,
        }}
        showsVerticalScrollIndicator={false}
<<<<<<< Updated upstream
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookings found</Text>
            <Text style={styles.emptySubtext}>
              When you have bookings, they'll appear here
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <BookingCardForAdmin
            id={item.id}
            restaurantId={item.restaurantId}
            name={item.name}
            phoneNumber={item.phone}
            email={item.email || ""}
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
            numberOfPeople={item.guests}
            status={item.status as BookingStatus}
          />
        )}
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});


=======
>>>>>>> Stashed changes
