import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import CreateOrEditBooking from "@/features/bookings/screens/CreateOrEditBooking";
import { clearCurrentBooking } from "@/features/bookings/store/booking.slice";
import { AppDispatch } from "@/store/store";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function BookingDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const bookingDetail = useSelector(
    (state: any) => state.booking.currentBooking
  );

  useEffect(() => {
    return () => {
      dispatch(clearCurrentBooking());
    };
  }, [dispatch]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Booking Details",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Box style={styles.card}>
          <Text style={styles.title}>Booking Information</Text>

          <Box style={styles.detailRow}>
            <Text style={styles.label}>Booking ID:</Text>
            <Text style={styles.value}>{bookingDetail?.id || "N/A"}</Text>
          </Box>

          <Box style={styles.detailRow}>
            <Text style={styles.label}>Restaurant Name:</Text>
            <Text style={styles.value}>
              {bookingDetail?.restaurantName || "N/A"}
            </Text>
          </Box>

          <Box style={styles.detailRow}>
            <Text style={styles.label}>Restaurant Address:</Text>
            <Text style={styles.value}>
              {bookingDetail?.restaurantAddress || "N/A"}
            </Text>
          </Box>
        </Box>

        <Box style={styles.editSection}>
          <CreateOrEditBooking />
        </Box>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    flexShrink: 1,
    marginLeft: 10,
    textAlign: "right",
  },
  editSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
