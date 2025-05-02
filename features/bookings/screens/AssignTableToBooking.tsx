import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import colors from "tailwindcss/colors";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { TABLE_STATUS } from "@/constants/constants";
import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import {
  useAssignTableToBookingMutation,
  useAvailableTableForBookingQuery,
  useUpdateBookingStatusMutation,
} from "../api/booking.api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import moment from "moment";
import {
  Toast,
  ToastDescription,
  ToastTitle,
  useToast,
} from "@/components/ui/toast";

interface AssignTableToBookingProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AssignTableToBooking = ({
  isOpen,
  onClose,
}: AssignTableToBookingProps) => {
  const toast = useToast();
  const booking = useSelector(
    (state: RootState) => state?.booking?.currentBooking
  );

  const [selectedTableIds, setSelectedTableIds] = useState<number[]>([]);

  const { data, isLoading: isFinding } = useAvailableTableForBookingQuery({
    restaurantId: booking?.restaurantId as number,
    date: moment(booking?.date).format("YYYY-MM-DD"),
    startTime: moment(booking?.startTime).format("HH:mm:ss"),
    endTime: moment(booking?.endTime).format("HH:mm:ss"),
  });

  const [assignTableToBooking, { isLoading }] =
    useAssignTableToBookingMutation();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateBookingStatusMutation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case TABLE_STATUS.OCCUPIED:
        return colors.red[500];
      case TABLE_STATUS.RESERVED:
        return colors.amber[500];
      case TABLE_STATUS.AVAILABLE:
        return colors.green[500];
      default:
        return colors.gray[500];
    }
  };

  const handleTableSelect = (tableId: number) => {
    if (selectedTableIds.includes(tableId)) {
      setSelectedTableIds((prev) => prev.filter((id) => id !== tableId));
    } else {
      setSelectedTableIds((prev) => [...prev, tableId]);
    }
  };

  const handleConfirm = async () => {
    if (selectedTableIds.length === 0) {
      toast.show({
        placement: "top right",
        render: () => (
          <Toast
            nativeID={String(booking?.id)}
            action="error"
            variant="outline"
          >
            <ToastTitle>Warning</ToastTitle>
            <ToastDescription>
              Please select at least one table to assign.
            </ToastDescription>
          </Toast>
        ),
      });
      return;
    }

    if (!booking?.id) {
      console.error("No booking ID available");
      return;
    }

    try {
      await assignTableToBooking({
        id: booking.id,
        tableIds: selectedTableIds,
      }).unwrap();

      await updateStatus({
        id: booking.id,
        status: "confirmed",
      }).unwrap();

      toast.show({
        placement: "top right",
        render: () => (
          <Toast
            nativeID={String(booking.id)}
            action="success"
            variant="outline"
          >
            <ToastTitle>Success</ToastTitle>
            <ToastDescription>Tables assigned successfully.</ToastDescription>
          </Toast>
        ),
      });

      onClose?.();
    } catch (error) {
      console.error("Failed to confirm booking:", error);
      toast.show({
        placement: "top right",
        render: () => (
          <Toast nativeID={String(booking.id)} action="error" variant="outline">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>
              Failed to assign tables. Please try again.
            </ToastDescription>
          </Toast>
        ),
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" className="text-typography-950">
            Select Table
          </Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} size="md" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <FlatList
            data={data?.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.tableItem,
                  {
                    backgroundColor: getStatusColor(item.status),
                    opacity: item.status === TABLE_STATUS.AVAILABLE ? 1 : 0.6,
                    borderWidth: selectedTableIds?.includes(item.id) ? 3 : 0,
                    borderColor: colors.blue[500],
                  },
                ]}
                disabled={item.status !== TABLE_STATUS.AVAILABLE}
                onPress={() => handleTableSelect(item.id)}
              >
                <Text style={styles.tableText}>{item.name}</Text>
                <Text style={styles.seatsText}>{item.numberOfSeats} ghế</Text>
                <Text style={styles.statusText}>
                  {item.status === TABLE_STATUS.AVAILABLE
                    ? "Available"
                    : item.status === TABLE_STATUS.OCCUPIED
                    ? "Occupied"
                    : TABLE_STATUS.RESERVED}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.flatListContent}
            scrollEnabled={false}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" action="secondary" onPress={onClose}>
            <ButtonText>Cancel</ButtonText>
          </Button>
          <Button variant="solid" action="primary" onPress={handleConfirm}>
            <ButtonText>Save</ButtonText>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  flatListContent: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
  tableItem: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  tableText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  seatsText: {
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    color: "white",
    marginTop: 4,
  },
});

export default AssignTableToBooking;
