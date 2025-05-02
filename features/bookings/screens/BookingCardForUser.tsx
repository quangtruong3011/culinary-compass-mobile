import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { ClockIcon, Icon, TrashIcon } from "@/components/ui/icon";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setCurrentBooking } from "../store/booking.slice";
import { AppDispatch } from "@/store/store";
import { bookingApi, useUpdateBookingStatusMutation } from "../api/booking.api";
import { Card } from "@/components/ui/card";
import { BOOKING_STATUS } from "@/constants/constants";
import { Toast, ToastTitle, useToast } from "@/components/ui/toast";
import { Badge, BadgeText } from "@/components/ui/badge";
import { BookingStatus } from "../types/booking-status.type";

interface BookingCardForUserProps {
  id: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  numberOfSeats: number;
  status: BookingStatus;
}

const BookingCardForUser = ({
  id,
  date,
  startTime,
  endTime,
  numberOfSeats,
  status,
}: BookingCardForUserProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const toast = useToast();

  const [updateStatusBooking, { isLoading }] = useUpdateBookingStatusMutation();

  const handleEditPress = async () => {
    const { data } = await dispatch(
      bookingApi.endpoints.findOneBookingForUser.initiate(id)
    );

    if (data) {
      dispatch(setCurrentBooking(data.data));
      router.push(`/user/booking/${id}`);
    }
  };

  const handleCancelPress = async () => {
    try {
      Alert.alert(
        "Cancel Booking",
        "Are you sure you want to cancel this booking?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              try {
                // Update the booking status to cancelled
                await updateStatusBooking({
                  id,
                  status: BOOKING_STATUS.CANCELLED,
                }).unwrap();

                // Show success toast if the booking is successfully cancelled
                toast.show({
                  placement: "top right",
                  duration: 3000,
                  render: () => (
                    <Toast
                      nativeID={`toast-${id}`}
                      action="success"
                      variant="outline"
                    >
                      <VStack space="xs">
                        <ToastTitle>Booking cancelled</ToastTitle>
                        <Text>Booking has been cancelled successfully.</Text>
                      </VStack>
                    </Toast>
                  ),
                });
              } catch (error) {
                // Show error toast if the cancellation fails
                toast.show({
                  placement: "top right",
                  duration: 3000,
                  render: () => (
                    <Toast
                      nativeID={`toast-${id}`}
                      action="error"
                      variant="outline"
                    >
                      <VStack space="xs">
                        <ToastTitle>Cancel booking failed</ToastTitle>
                        <Text>Failed to cancel booking. Please try again.</Text>
                      </VStack>
                    </Toast>
                  ),
                });
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <TouchableOpacity onPress={handleEditPress}>
      <Card style={styles.card}>
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
            <Badge
              size="md"
              variant="solid"
              action={
                status === BOOKING_STATUS.PENDING
                  ? "warning"
                  : status === BOOKING_STATUS.CONFIRMED
                  ? "success"
                  : status === BOOKING_STATUS.CANCELLED
                  ? "error"
                  : "info"
              }
            >
              <BadgeText>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </BadgeText>
            </Badge>
          </VStack>
          {status === "pending" && (
            <Button onPress={handleCancelPress}>
              <ButtonIcon as={TrashIcon} size="md" />
              <ButtonText>Cancel</ButtonText>
            </Button>
          )}
        </HStack>
      </Card>
    </TouchableOpacity>
  );
};

export default BookingCardForUser;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
