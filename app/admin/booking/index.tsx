import { PAGE, PAGE_SIZE } from "@/constants/constants";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFindAllBookingForAdminQuery } from "@/features/bookings/api/booking.api";
import BookingCardForAdmin from "@/features/bookings/screens/BookingCardForAdmin";
import BookingCardForUser from "@/features/bookings/screens/BookingCardForUser";
import BookingListHeader from "@/features/bookings/screens/BookingListHeader";
import { useState } from "react";
import { FlatList, Text } from "react-native";

export default function Booking() {
  const [page, setPage] = useState(PAGE);

  const { data, isLoading, isError, refetch, isFetching } =
    useFindAllBookingForAdminQuery({
      page: PAGE,
      limit: PAGE_SIZE,
      filterText: "",
    });

  const bookings = data?.data.results || [];

  return (
    <>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookingCardForAdmin
            id={item.id}
            restaurantId={item.restaurantId}
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
            numberOfSeats={item.guests}
            isConfirmed={item.isConfirmed}
          />
        )}
        ListHeaderComponent={BookingListHeader}
      />
    </>
  );
}
