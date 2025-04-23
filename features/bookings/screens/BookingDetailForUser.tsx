import { Stack, useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import moment from "moment";


const BookingDetailForUser = () => {
  const booking = useSelector(
    (state: RootState) => state.booking.currentBooking
  );
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Booking Detail",
          headerShown: true,
        }}
      />
      <Text>Name: {booking?.name}</Text>
      <Text>Phone: {booking?.phone}</Text>
      <Text>Email: {booking?.email}</Text>
      <Text>Date: {moment(booking?.date).format("MMMM Do YYYY")}</Text>
      <Text>Start Time: {moment(booking?.startTime).format("h:mm A")}</Text>
      <Text>End Time: {moment(booking?.endTime).format("h:mm A")}</Text>
      <Text>Number of Seats: {booking?.guests}</Text>
      <Text>Status: {booking?.isConfirmed ? "Confirmed" : "Pending"}</Text>
    </>
  );
};

export default BookingDetailForUser;
