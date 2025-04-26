import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Alert, Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { EditIcon, TrashIcon } from "@/components/ui/icon";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBooking } from "../store/booking.slice";
import { RootState } from "@/store/store";
import { useDeleteBookingMutation, useFindBookingForUserQuery, useGetBookingsByUserQuery } from "../api/booking.api";
import { useFindAllRestaurantsForUserQuery, useFindRestaurantForUserQuery } from "@/features/restaurants/api/restaurant.api";

interface BookingListForUserProps {
  id: number;
  restaurantId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  numberOfSeats: number;
  isConfirmed: boolean;
  isDeleted: boolean;
}
const BookingCardForUser = ({
  id,
  restaurantId,
  date,
  startTime,
  endTime,
  numberOfSeats,
  isConfirmed,
  isDeleted,
  onActionComplete,
}: BookingListForUserProps & {onActionComplete: () => void}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data: restaurant } = useFindRestaurantForUserQuery(restaurantId.toString());

  const { data, isLoading, } = useFindBookingForUserQuery(id as number);

  const [deleteBooking] = useDeleteBookingMutation();

  const handleEditPress = () => {
    dispatch(setCurrentBooking(data?.data));
    router.push(`../user/booking/${id}`);
    console.log("isDeleted", isDeleted);
    onActionComplete();
  };

  const handleCancelPress = async () => {
    Alert.alert(
      "Confirm Booking",
      "Are you sure you want to cancel this booking?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await deleteBooking(id as number).unwrap();
              console.log("Booking cancelled successfully");
              onActionComplete();
            } catch (error) {
              console.error("Failed to cancel booking:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <Box style={styles.box}>
      <HStack className="justify-between items-center">
        <VStack space="xs">
          <Text size="lg" className="font-semibold">
            Retaurant: {restaurant?.data.name || "Unknown"}
          </Text>
          <Text size="lg" className="font-semibold">
            {moment(date).format("MMMM Do YYYY")}
          </Text>
          <Text size="sm" className="text-gray-500">
            {moment(startTime).format("h:mm A")} -{" "}
            {moment(endTime).format("h:mm A")}
          </Text>
          <Text size="sm" className="text-gray-500">
            Number of Seats: {numberOfSeats}
          </Text>
          <Text size="sm" className="text-gray-500">
            Status: {isConfirmed ? "Confirmed" : "Pending"}
          </Text>
        </VStack>
        <HStack space="xs">
          {isDeleted ? (
            <Text size="sm" className="text-red-500 font-semibold">
              Booking Cancelled
            </Text>
          ) : (
            <>
              <Button variant="outline" onPress={handleEditPress}>
                <ButtonIcon as={EditIcon} size="sm" />
                <ButtonText>Edit</ButtonText>
              </Button>
              <Button
                variant="solid"
                style={{ backgroundColor: "red" }}
                onPress={handleCancelPress}
                isDisabled={isLoading}
              >
                <ButtonIcon as={TrashIcon} size="sm" />
                <ButtonText>Cancel</ButtonText>
              </Button>
          </>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};

export default BookingCardForUser;

const styles = StyleSheet.create({
  box: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 8,
  },
});
