import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Button, ButtonIcon } from "@/components/ui/button";
import { EditIcon, Icon, MenuIcon, TrashIcon } from "@/components/ui/icon";
import { Alert, StyleSheet } from "react-native";
import { TableStatus } from "../types/table-status.type";

export interface TableCardProps {
  id: number;
  name: string;
  restaurantId: number;
  numberOfSeats: number;
  status: TableStatus;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TableCard = ({
  id,
  name,
  restaurantId,
  numberOfSeats,
  status,
  onEdit,
  onDelete,
}: TableCardProps) => {
  const mapStatusColor = (
    statusColor: "available" | "occupied" | "reserved"
  ): "success" | "warning" | "info" | "error" | "muted" | undefined => {
    switch (statusColor) {
      case "available":
        return "success";
      case "occupied":
        return "error";
      case "reserved":
        return "warning";
      default:
        return "info";
    }
  };

  const handleEdit = () => onEdit?.(id);
  const handleDelete = () => {
    Alert.alert(
      "Are you sure?",
      `Are you sure you want to delete table ${name}?`,

      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => onDelete?.(id),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Box style={styles.box}>
      <HStack className="justify-between items-center">
        <VStack space="xs">
          <Text
            size="lg"
            style={{
              fontWeight: "bold",
              color: "black",
            }}
          >
            {name}
          </Text>
          <HStack space="md" className="items-center">
            <Text size="sm">Seats: {numberOfSeats}</Text>
            {/* <Badge size="md" variant="solid" action={mapStatusColor(status)}>
              <BadgeText>
                {status.charAt(0).toUpperCase() + status.slice(1)}
                {status.toUpperCase()}
              </BadgeText>
            </Badge> */}
          </HStack>
        </VStack>
        <Menu
          placement="left top"
          offset={-32}
          trigger={({ ...triggerProps }) => {
            return (
              <Button {...triggerProps} variant="outline" size="sm">
                <ButtonIcon as={MenuIcon} />
              </Button>
            );
          }}
        >
          <MenuItem key="Edit" textValue="Edit" onPress={handleEdit}>
            <Icon as={EditIcon} size="sm" className="mr-2" />
            <MenuItemLabel size="sm">Edit</MenuItemLabel>
          </MenuItem>
          <MenuItem key="Delete" textValue="Delete" onPress={handleDelete}>
            <Icon as={TrashIcon} size="sm" className="mr-2" />
            <MenuItemLabel size="sm">Delete</MenuItemLabel>
          </MenuItem>
        </Menu>
      </HStack>
    </Box>
  );
};
export default TableCard;

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
