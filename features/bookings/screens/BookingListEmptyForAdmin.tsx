import { View, Text } from "react-native";

const BookingListEmptyForAdmin = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: "#333",
          marginBottom: 8,
        }}
      >
        No bookings found
      </Text>
      <Text style={{ fontSize: 14, color: "#777", textAlign: "center" }}>
        When you have bookings, they'll appear here
      </Text>
    </View>
  );
};

export default BookingListEmptyForAdmin;
