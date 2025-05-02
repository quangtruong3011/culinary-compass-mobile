import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import AssignTableToBooking from "@/features/bookings/screens/AssignTableToBooking";
import CreateOrEditBooking from "@/features/bookings/screens/CreateOrEditBooking";
import { RootState } from "@/store/store";
import { Stack } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { Text } from "@/components/ui/text";

export default function BookingDetailScreen() {
  const [showModal, setShowModal] = useState(false);
  const booking = useSelector(
    (state: RootState) => state?.booking.currentBooking
  );
  const bookingTables = booking?.tables || [];
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Booking Details",
        }}
      />
      <View style={styles.container}>
        <View style={styles.card}>
          <Heading style={styles.heading}>📋 Booking Information</Heading>
          <CreateOrEditBooking />
        </View>

        <View style={styles.card}>
          <Heading style={styles.heading}>🍽️ Assign Table</Heading>
          {bookingTables.length > 0 && (
            <View style={styles.tableList}>
              {bookingTables.map((table) => (
                <View key={table.id} style={styles.tableItem}>
                  <Text style={styles.tableName}>🪑 {table.name}</Text>
                  <Text style={styles.tableSeats}>
                    Seats: {table.numberOfSeats}
                  </Text>
                </View>
              ))}
            </View>
          )}
          {booking?.status !== "cancelled" &&
            booking?.status !== "completed" && (
              <>
                <Button onPress={handleOpenModal} style={styles.assignButton}>
                  <ButtonText>+ Assign Table to Booking</ButtonText>
                </Button>
                <AssignTableToBooking
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                />
              </>
            )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
    gap: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  assignButton: {
    marginBottom: 16,
  },
  tableList: {
    marginTop: 8,
    marginBottom: 16,
    gap: 12,
  },
  tableItem: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    borderColor: "#e0e0e0",
    borderWidth: 1,
  },
  tableName: {
    fontWeight: "600",
    fontSize: 16,
    color: "#444",
  },
  tableSeats: {
    fontSize: 14,
    color: "#666",
  },
});
