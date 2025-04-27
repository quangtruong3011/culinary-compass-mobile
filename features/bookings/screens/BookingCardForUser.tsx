import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { ClockIcon, Icon, TrashIcon } from "@/components/ui/icon";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setCurrentBooking } from "../store/booking.slice";
import { AppDispatch } from "@/store/store";
import { bookingApi } from "../api/booking.api";
import { Card } from "@/components/ui/card";

interface BookingListForUserProps {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  numberOfSeats: number;
  isConfirmed: boolean;
}

type BookingStatus = "pending" | "confirmed" | "cancelled";

const BookingCardForUser = ({
  id,
  date,
  startTime,
  endTime,
  numberOfSeats,
  isConfirmed,
}: BookingListForUserProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleEditPress = async () => {
    const { data } = await dispatch(
      bookingApi.endpoints.findOneBookingForUser.initiate(id)
    );

    if (data) {
      dispatch(setCurrentBooking(data.data));
      router.push(`/user/booking/${id}`);
    }
  };

  return (
    <TouchableOpacity onPress={handleEditPress}>
      <Card>
        <HStack className="justify-between items-center">
          <VStack space="xs">
            <Text className="text-lg font-semibold">
              {moment(date).format("DD/MM/YYYY")}
            </Text>
            <HStack space="xs" className="items-center">
              <Icon as={ClockIcon} size="sm" />
              <Text>{moment(startTime).format("HH:mm")}</Text>
              <Text>-</Text>
              <Text>{moment(endTime).format("HH:mm")}</Text>
            </HStack>
            <Text className="text-sm text-gray-500">
              Number of guests: {numberOfSeats} guests
            </Text>
          </VStack>
          <Button>
            <ButtonIcon as={TrashIcon} size="md" />
            {!isConfirmed && <ButtonText>Cancel</ButtonText>}
          </Button>
        </HStack>
      </Card>
    </TouchableOpacity>
  );
};

export default BookingCardForUser;
