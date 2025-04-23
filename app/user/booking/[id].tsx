import {
  useFindBookingForUserQuery,
  useUpdateBookingMutation,
} from "@/features/bookings/api/booking.api";
import { CreateOrEditBookingDto } from "@/features/bookings/interfaces/create-or-edit-booking.interface";
import CreateOrEditBookingForm from "@/features/bookings/screens/CreateOrEditBookingForm";
import { RootState } from "@/store/store";
import { Stack, useRouter } from "expo-router";
import { Alert } from "react-native";
import { useSelector } from "react-redux";

export default function BookingDetail() {
  const booking = useSelector(
    (state: RootState) => state.booking?.currentBooking ?? null
  );

  const router = useRouter();

  const [update, { isLoading }] = useUpdateBookingMutation();

  const handleUpdate = async (data: CreateOrEditBookingDto) => {
    try {
      await update({ id: booking?.id as number, data })
        .unwrap()
        .then(() => {
          Alert.alert("Success", "Booking updated successfully");
        })
        .catch((error) => {
          Alert.alert("Error", "Failed to update booking");
          console.error(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Booking detail",
          headerShown: true,
        }}
      />

      <CreateOrEditBookingForm
        onSubmit={handleUpdate}
        initialValues={booking as CreateOrEditBookingDto}
        isLoading={isLoading}
      />
    </>
  );
}
