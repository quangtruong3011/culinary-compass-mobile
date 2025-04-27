import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { EditIcon, TrashIcon } from "@/components/ui/icon";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  useConfirmBookingMutation,
  useFindAllBookingForAdminQuery,
} from "../api/booking.api";

interface BookingListForAdminProps {
  id: number;
  restaurantId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  numberOfSeats: number;
  isConfirmed: boolean;
}

const BookingCardForAdmin = ({
  id,
  restaurantId,
  date,
  startTime,
  endTime,
  numberOfSeats,
  isConfirmed,
}: BookingListForAdminProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [confirmBooking, { isLoading }] = useConfirmBookingMutation();

  const { data } = useFindAllBookingForAdminQuery({
    page: 1,
    limit: 10,
    filterText: "",
  });

  const handleConfirmPress = async () => {
    try {
      await confirmBooking(id).unwrap();
      console.log("Booking confirmed successfully");
    } catch (error) {
      console.error("Failed to confirm booking:", error);
    }
  };

  return (
    <Box style={styles.box}>
      <HStack className="justify-between items-center">
        <VStack space="xs">
          {/* <Text size="lg" className="font-semibold">
            Retaurant: {restaurant?.name}
          </Text> */}
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
          <Button
            variant="outline"
            onPress={handleConfirmPress}
            disabled={isLoading}
          >
            <ButtonIcon as={EditIcon} size="sm" />
            <ButtonText>{isLoading ? "Confirming..." : "Confirm"}</ButtonText>
          </Button>
          <Button
            variant="solid"
            style={{ backgroundColor: "red" }}
            onPress={() => console.log("Cancel booking")}
          >
            <ButtonIcon as={TrashIcon} size="sm" />
            <ButtonText>Cancel</ButtonText>
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};
export default BookingCardForAdmin;

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
