import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import {
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  EyeIcon,
  Icon,
  MailIcon,
  PhoneIcon,
  TrashIcon,
} from "@/components/ui/icon";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { bookingApi, useUpdateBookingStatusMutation } from "../api/booking.api";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Badge, BadgeText } from "@/components/ui/badge";
import colors from "tailwindcss/colors";
import { BookingStatus } from "../types/booking-status.type";
import { setCurrentBooking } from "../store/booking.slice";
import { AppDispatch } from "@/store/store";
import { BOOKING_STATUS } from "@/constants/constants";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

interface BookingCardForAdminProps {
  id: number;
  name: string;
  phone: string;
  email?: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  numberOfSeats: number;
  status: BookingStatus;
}

const getStatusColor = (status: BookingStatus) => {
  switch (status) {
    case "confirmed":
      return colors.green[500];
    case "pending":
      return colors.yellow[500];
    case "cancelled":
      return colors.red[500];
    case "completed":
      return colors.blue[500];
    default:
      return colors.gray[500];
  }
};

const BookingCardForAdmin = ({
  id,
  name,
  phone,
  email,
  date,
  startTime,
  endTime,
  numberOfSeats,
  status,
}: BookingCardForAdminProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const toast = useToast();

  const [updateStatus, { isLoading }] = useUpdateBookingStatusMutation();

  const handleConfirmPress = async () => {
    const { data, isSuccess } = await dispatch(
      bookingApi.endpoints.findOneBookingForAdmin.initiate(id)
    );
    if (isSuccess && data) {
      dispatch(setCurrentBooking(data.data));
      router.push(`/admin/booking/${id}`);
    }
  };

  const handleCancelPress = async () => {
    await updateStatus({ id, status: BOOKING_STATUS.CANCELLED }).then(() => {
      toast.show({
        placement: "top right",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="outline">
            <ToastTitle>Booking Cancelled</ToastTitle>
            <ToastDescription>
              The booking has been successfully cancelled.
            </ToastDescription>
          </Toast>
        ),
      });
    });
  };

  const handleCompletePress = async () => {
    await updateStatus({ id, status: BOOKING_STATUS.COMPLETED });
    toast.show({
      placement: "top right",
      render: ({ id }) => (
        <Toast nativeID={`toast-${id}`} action="success" variant="outline">
          <ToastTitle>Booking Completed</ToastTitle>
          <ToastDescription>
            The booking has been successfully marked as completed.
          </ToastDescription>
        </Toast>
      ),
    });
  };

  const handleViewDetailsPress = async () => {
    const { data, isSuccess } = await dispatch(
      bookingApi.endpoints.findOneBookingForAdmin.initiate(id)
    );
    if (isSuccess && data) {
      dispatch(setCurrentBooking(data.data));
      router.push(`/admin/booking/${id}`);
    }
  };

  return (
    <TouchableOpacity onPress={handleConfirmPress} disabled={isLoading}>
      <Card style={styles.card}>
        <HStack className="justify-between items-center p-4 border-b border-gray-200">
          <Heading>{name}</Heading>
          <Badge style={{ backgroundColor: getStatusColor(status) }}>
            <BadgeText>{status.toUpperCase()}</BadgeText>
          </Badge>
        </HStack>
        <VStack>
          <HStack className="p-4 gap-2 items-center">
            <Icon as={PhoneIcon} size="lg" />
            <Text>{phone}</Text>
          </HStack>
          <HStack className="p-4 gap-2 items-center">
            <Icon as={MailIcon} size="lg" />
            <Text>{email}</Text>
          </HStack>
          <HStack className="p-4 gap-2 items-center">
            <Icon as={ClockIcon} size="lg" />
            <Text>{moment(date).format("DD/MM/YYYY")}</Text>
          </HStack>
          <HStack className="p-4 gap-2 items-center">
            <Icon as={ClockIcon} size="lg" />
            <Text>
              {moment(startTime).format("h:mm A")} -{" "}
              {moment(endTime).format("h:mm A")}
            </Text>
          </HStack>
          <HStack className="p-4 gap-2 items-center">
            <Text>Number of seats: {numberOfSeats} seats</Text>
          </HStack>
        </VStack>
        <HStack className="p-4 justify-end gap-2 border-t border-gray-200">
          {status === "pending" ? (
            <>
              <Button variant="outline" size="sm" onPress={handleCancelPress}>
                <ButtonIcon as={TrashIcon} size="sm" />
                <ButtonText>Decline</ButtonText>
              </Button>
              <Button variant="outline" size="sm" onPress={handleConfirmPress}>
                <ButtonIcon as={CheckIcon} size="sm" />
                <ButtonText>Confirm</ButtonText>
              </Button>
            </>
          ) : status === "confirmed" ? (
            <>
              <Button variant="outline" size="sm" onPress={handleCancelPress}>
                <ButtonIcon as={TrashIcon} size="sm" />
                <ButtonText>Cancel Booking</ButtonText>
              </Button>
              <Button variant="outline" size="sm" onPress={handleCompletePress}>
                <ButtonIcon as={CheckCircleIcon} size="sm" />
                <ButtonText>Mark as Completed</ButtonText>
              </Button>
            </>
          ) : status === "completed" ? (
            <Button
              variant="outline"
              size="sm"
              onPress={handleViewDetailsPress}
            >
              <ButtonIcon as={EyeIcon} size="sm" />
              <ButtonText>View Details</ButtonText>
            </Button>
          ) : status === "cancelled" ? (
            <Button
              variant="outline"
              size="sm"
              onPress={handleViewDetailsPress}
            >
              <ButtonIcon as={EyeIcon} size="sm" />
              <ButtonText>View Details</ButtonText>
            </Button>
          ) : null}
        </HStack>
      </Card>
    </TouchableOpacity>
  );
};
export default BookingCardForAdmin;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
});
