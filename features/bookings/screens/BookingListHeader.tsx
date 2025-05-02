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
