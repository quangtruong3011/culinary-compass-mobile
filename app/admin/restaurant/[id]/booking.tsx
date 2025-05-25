import { Stack } from "expo-router";
import {
  FlatList,
  RefreshControl,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import React, { useCallback, useState } from "react";
import BookingListEmptyForAdmin from "@/features/bookings/screens/BookingListEmptyForAdmin";
import BookingCardForAdmin from "@/features/bookings/screens/BookingCardForAdmin";
import { useFindAllBookingForAdminQuery } from "@/features/bookings/api/booking.api";
import { PAGE, PAGE_SIZE } from "@/constants/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import DropDownPicker from "react-native-dropdown-picker";

export default function RestaurantBooking() {
  const restaurantId = useSelector(
    (state: RootState) => state?.restaurant?.currentRestaurant?.id
  );
  const [page, setPage] = useState(PAGE);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [items, setItems] = useState([
    { label: "All status", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Completed", value: "completed" },
  ]);

  const { data, isLoading, isError, refetch } = useFindAllBookingForAdminQuery({
    page: page,
    limit: PAGE_SIZE,
    filterText: filterText,
    restaurantId: restaurantId,
    status: status,
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

      <View style={styles.filterContainer}>
        <TextInput
          placeholder="Search by name..."
          value={filterText}
          onChangeText={(text) => {
            setPage(1);
            setFilterText(text);
          }}
          style={styles.textInput}
        />

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={open}
            value={status}
            items={items}
            setOpen={setOpen}
            setValue={(callback) => {
              const value = callback(status);
              setStatus(value);
              setPage(1);
            }}
            setItems={setItems}
            placeholder="Status"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={1000}
            zIndexInverse={1000}
          />
        </View>
      </View>

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

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
    zIndex: 1000, // để DropDown hiển thị đúng
  },
  textInput: {
    flex: 3,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  dropdownWrapper: {
    flex: 2,
    zIndex: 1000,
  },
  dropdown: {
    borderColor: "#ccc",
    height: 40,
  },
  dropdownContainer: {
    borderColor: "#ccc",
  },
});
