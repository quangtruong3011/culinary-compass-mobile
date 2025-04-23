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
import { setCurrentBooking } from "../store/booking.slice";
import { RootState } from "@/store/store";
import { useFindBookingForUserQuery } from "../api/booking.api";

interface BookingListForUserProps {
  id: number;
  restaurantId: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  numberOfSeats: number;
  isConfirmed: boolean;
  restaurantName: string;
}
const BookingCardForUser = ({
  id,
  restaurantId,
  date,
  startTime,
  endTime,
  numberOfSeats,
  isConfirmed,
  restaurantName,
}: BookingListForUserProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

 

  const { data } = useFindBookingForUserQuery(id as number);

  const handleEditPress = () => {
    dispatch(setCurrentBooking(data?.data));
    router.push(`../user/booking/${id}`);
  };

  return (
    <Box style={styles.box}>
      <HStack className="justify-between items-center">
        <VStack space="xs">
          <Text size="lg" className="font-semibold">
            Retaurant: {restaurantName}
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
          <Button variant="outline" onPress={handleEditPress}>
            <ButtonIcon as={EditIcon} size="sm" />
            <ButtonText>Edit</ButtonText>
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
