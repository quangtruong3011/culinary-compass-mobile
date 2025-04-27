import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { EditIcon, TrashIcon } from "@/components/ui/icon";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBooking } from "../store/booking.slice";
import { RootState } from "@/store/store";
import {  useFindBookingForUserQuery, useGetAllBookingsQuery, useGetBookingsByAdminQuery, useUpdateBookingStatusMutation } from "../api/booking.api";
import { BookingParam } from "../interfaces/booking-param.interface";
import { BookingStatus } from "./BookingCardForUser";
import colors from "tailwindcss/colors";
import { Badge, BadgeText } from "@/components/ui/badge";

interface BookingListForAdminProps {
  id: number;
    restaurantId: number;
    name: string;
    phoneNumber: string;
    email: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    numberOfPeople: number;
    status: BookingStatus;
    specialRequests?: string;
}

const BookingCardForAdmin = ({
  id,
    restaurantId,
    name,
    phoneNumber,
    email,
    date,
    startTime,
    endTime,
    numberOfPeople,
    status,
    specialRequests,
}: BookingListForAdminProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [updateBookingStatus] = useUpdateBookingStatusMutation();

  const handlePress = () => {
      Alert.alert(
        "Booking Details",
        `Name: ${name}\nPhone: ${phoneNumber}\nEmail: ${
          email
        }\nDate: ${date}\nTime: ${moment(startTime).format(
          "HH:mm"
        )} - ${moment(endTime).format("HH:mm")}\nNumber of People: ${
          numberOfPeople
        }\nStatus: ${status}${
          specialRequests
            ? `\n\nSpecial Requests: ${specialRequests}`
            : ""
        }`,
        [{ text: "OK" }]
      );
    };
  
    const handleConfirm = () => {
      Alert.alert(
        "Confirm Booking",
        `Are you sure you want to confirm the booking for ${name}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: () => updateBookingStatus({ id: id, status: BookingStatus.CONFIRMED }),
          },
        ]
      );
    };
  
    const handleCancel = () => {
      Alert.alert(
        "Cancel Booking",
        `Are you sure you want to cancel the booking for ${name}?`,
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => updateBookingStatus({ id: id, status: BookingStatus.CANCELLED}),
          },
        ]
      );
    };
  
    const handleComplete = () => {
      Alert.alert(
        "Complete Booking",
        `Are you sure you want to mark the booking for ${name} as completed?`,
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => updateBookingStatus({ id: id, status: BookingStatus.COMPLETED}),
          },
        ]
      );
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

  return (
    <Pressable onPress={() => handlePress()}>
      <View style={styles.card}>
        <HStack style={styles.cardHeader}>
          <Text style={styles.name}>{name}</Text>
          <Badge style={{ backgroundColor: getStatusColor(status) }}>
            <BadgeText>{status.toUpperCase()}</BadgeText>
          </Badge>
        </HStack>

        <VStack style={styles.cardBody}>
          <HStack style={styles.infoRow}>
            {/* <Phone size={16} color={colors.muted} /> */}
            <Text style={styles.infoText}>{phoneNumber}</Text>
          </HStack>

          <HStack style={styles.infoRow}>
            {/* <Mail size={16} color={colors.muted} /> */}
            <Text style={styles.infoText}>{email}</Text>
          </HStack>

          <HStack style={styles.infoRow}>
            {/* <CalendarDays size={16} color={colors.muted} /> */}
            <Text style={styles.infoText}>
              {moment(date).format("MMM D, YYYY")}
            </Text>
          </HStack>

          <HStack style={styles.infoRow}>
            {/* <Clock size={16} color={colors.muted} /> */}
            <Text style={styles.infoText}>
              {moment(startTime).format("h:mm A")} -{" "}
              {moment(endTime).format("h:mm A")}
            </Text>
          </HStack>

          <HStack style={styles.infoRow}>
            {/* <Users size={16} color={colors.muted} /> */}
            <Text style={styles.infoText}>{numberOfPeople} people</Text>
          </HStack>
        </VStack>

        <HStack style={styles.cardFooter}>
          {status === "pending" ? (
            <>
              <Button variant="outline" onPress={() => handleCancel()}>
                <ButtonText>Decline</ButtonText>
              </Button>
              <Button onPress={() => handleConfirm()}>
                <ButtonText>Confirm</ButtonText>
              </Button>
            </>
          ) : status === "confirmed" ? (
            <>
            <Button variant="outline" onPress={() => handleComplete()}>
                <ButtonText>Complete</ButtonText>
              </Button>
            <Button variant="outline" onPress={() => handleCancel()}>
              <ButtonText>Cancel Booking</ButtonText>
            </Button>
            </>
          ) : null}
        </HStack>
      </View>
    </Pressable>
  );
};
export default BookingCardForAdmin;

const styles = StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: 32,
    },
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
    cardHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardBody: {
      padding: 16,
      gap: 12,
    },
    cardFooter: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#f0f0f0",
      justifyContent: "flex-end",
      gap: 12,
    },
    name: {
      fontSize: 18,
      fontWeight: "600",
      color: "#1a1a1a",
    },
    infoRow: {
      alignItems: "center",
      gap: 8,
    },
    infoText: {
      fontSize: 14,
      color: "#555",
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
    },
    emptyText: {
      fontSize: 18,
      fontWeight: "500",
      color: "#333",
      marginBottom: 8,
    },
    emptySubtext: {
      fontSize: 14,
      color: "#777",
      textAlign: "center",
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(255,255,255,0.7)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
  });