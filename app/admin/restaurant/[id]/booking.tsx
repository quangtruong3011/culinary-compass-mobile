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

type BookingStatus = "confirmed" | "pending" | "cancelled" | "completed";

interface Booking {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  date: string;
  startTime: string;
  endTime: string;
  numberOfPeople: number;
  status: BookingStatus;
  specialRequests?: string;
}

export default function RestaurantBooking() {
  const [refreshing, setRefreshing] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(data);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      // In a real app, you would fetch updated data here
    }, 1500);
  }, []);

  const handlePress = (item: Booking) => {
    Alert.alert(
      "Booking Details",
      `Name: ${item.name}\nPhone: ${item.phoneNumber}\nEmail: ${
        item.email
      }\nDate: ${item.date}\nTime: ${moment(item.startTime).format(
        "HH:mm"
      )} - ${moment(item.endTime).format("HH:mm")}\nNumber of People: ${
        item.numberOfPeople
      }\nStatus: ${item.status}${
        item.specialRequests
          ? `\n\nSpecial Requests: ${item.specialRequests}`
          : ""
      }`,
      [{ text: "OK" }]
    );
  };

  const handleConfirm = (item: Booking) => {
    Alert.alert(
      "Confirm Booking",
      `Are you sure you want to confirm the booking for ${item.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => updateBookingStatus(item.id, "confirmed"),
        },
      ]
    );
  };

  const handleCancel = (item: Booking) => {
    Alert.alert(
      "Cancel Booking",
      `Are you sure you want to cancel the booking for ${item.name}?`,
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => updateBookingStatus(item.id, "cancelled"),
        },
      ]
    );
  };

  const updateBookingStatus = (id: number, status: BookingStatus) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status } : booking
        )
      );
      setLoading(false);
    }, 800);
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "confirmed":
        return colors.green[500];
      case "pending":
        return colors.yellow[500];
      case "cancelled":
        return colors.red[500];
      case "completed":
        return colors.blue[500];
      default:
        return colors.gray[500];
    }
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <Pressable onPress={() => handlePress(item)}>
      <View style={styles.card}>
        <HStack style={styles.cardHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Badge style={{ backgroundColor: getStatusColor(item.status) }}>
            <BadgeText>{item.status.toUpperCase()}</BadgeText>
          </Badge>
        </HStack>

        <VStack style={styles.cardBody}>
          <HStack style={styles.infoRow}>
            {/* <Phone size={16} color={colors.muted} /> */}
            <Text style={styles.infoText}>{item.phoneNumber}</Text>
          </HStack>

          <HStack style={styles.infoRow}>
            {/* <Mail size={16} color={colors.muted} /> */}
            <Text style={styles.infoText}>{item.email}</Text>
          </HStack>

          <HStack style={styles.infoRow}>
            {/* <CalendarDays size={16} color={colors.muted} /> */}
            <Text style={styles.infoText}>
              {moment(item.date).format("MMM D, YYYY")}
            </Text>
          </HStack>

          <HStack style={styles.infoRow}>
            {/* <Clock size={16} color={colors.muted} /> */}
            <Text style={styles.infoText}>
              {moment(item.startTime).format("h:mm A")} -{" "}
              {moment(item.endTime).format("h:mm A")}
            </Text>
          </HStack>

          <HStack style={styles.infoRow}>
            {/* <Users size={16} color={colors.muted} /> */}
            <Text style={styles.infoText}>{item.numberOfPeople} people</Text>
          </HStack>
        </VStack>

        <HStack style={styles.cardFooter}>
          {item.status === "pending" ? (
            <>
              <Button variant="outline" onPress={() => handleCancel(item)}>
                <ButtonText>Decline</ButtonText>
              </Button>
              <Button onPress={() => handleConfirm(item)}>
                <ButtonText>Confirm</ButtonText>
              </Button>
            </>
          ) : item.status === "confirmed" ? (
            <Button variant="outline" onPress={() => handleCancel(item)}>
              <ButtonText>Cancel Booking</ButtonText>
            </Button>
          ) : null}
        </HStack>
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Booking Management",
          headerTitleAlign: "center",
        }}
      />

      {loading && (
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
        renderItem={renderBookingItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
}

const data: Booking[] = [
  {
    id: 1,
    name: "John Doe",
    phoneNumber: "(123) 456-7890",
    email: "john@example.com",
    date: "2023-10-01",
    startTime: "2023-10-01T12:00:00Z",
    endTime: "2023-10-01T14:00:00Z",
    numberOfPeople: 4,
    status: "confirmed",
    specialRequests: "Window seat preferred, if possible",
  },
  {
    id: 2,
    name: "Jane Smith",
    phoneNumber: "(987) 654-3210",
    email: "jane@example.com",
    date: "2023-10-02",
    startTime: "2023-10-02T18:00:00Z",
    endTime: "2023-10-02T20:00:00Z",
    numberOfPeople: 2,
    status: "pending",
  },
  {
    id: 3,
    name: "Robert Johnson",
    phoneNumber: "(555) 123-4567",
    email: "robert@example.com",
    date: "2023-10-03",
    startTime: "2023-10-03T19:30:00Z",
    endTime: "2023-10-03T21:30:00Z",
    numberOfPeople: 6,
    status: "completed",
  },
  {
    id: 4,
    name: "Emily Wilson",
    phoneNumber: "(444) 555-6666",
    email: "emily@example.com",
    date: "2023-10-04",
    startTime: "2023-10-04T13:00:00Z",
    endTime: "2023-10-04T15:00:00Z",
    numberOfPeople: 3,
    status: "cancelled",
  },
];

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardBody: {
    padding: 16,
    gap: 12,
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    justifyContent: "flex-end",
    gap: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  infoRow: {
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
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
