import { useAuth } from "@/features/auth/hooks/useAuth";
import { useGetBookingsByUserQuery } from "@/features/bookings/api/booking.api";
import { Booking } from "@/features/bookings/interfaces/booking.interface";
import BookingCardForUser, { BookingStatus } from "@/features/bookings/screens/BookingCardForUser";
import BookingListHeader from "@/features/bookings/screens/BookingListHeader";
import { useState } from "react";
import { FlatList, Text } from "react-native";

const PASE_SIZE = 10;

export default function BookingScreen() {
  const [page, setPage] = useState(1);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [bookingId, setBookingId] = useState<number | null>(null);

  const { user } = useAuth();

  const { data, isLoading, isError, refetch, isFetching } =
    useGetBookingsByUserQuery({
      page: page,
      limit: PASE_SIZE,
      filterText: "",
      userId: user?.id as number,
    });
    console.log("data", data);

  const bookings = [...(data?.data.results || [])].sort(
    (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  );

  return (
    <>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookingCardForUser
            id={item.id}
            restaurantId={item.restaurantId}
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
            numberOfSeats={item.guests}
            status={item.status as BookingStatus}
            onActionComplete={refetch}
          />
        )}
        ListHeaderComponent={BookingListHeader}
      />
    </>
  );
}
