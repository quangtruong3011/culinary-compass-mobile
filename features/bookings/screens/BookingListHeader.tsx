import { relativeTimeRounding } from "moment";
import { Text } from "react-native";
import BookingListForUser from "./BookingCardForUser";
import { Stack } from "expo-router";

const BookingListHeader = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "My Bookings",
        }}
      />
    </>
  );
};

export default BookingListHeader;
