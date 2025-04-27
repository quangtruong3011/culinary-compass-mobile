import { Stack } from "expo-router";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { useCallback, useState } from "react";
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

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Booking Management",
          headerTitleAlign: "center",
        }}
      />

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" />
        </View>
      )}

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
}

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


