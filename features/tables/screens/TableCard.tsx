import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { EditIcon, Icon, MenuIcon, TrashIcon } from "@/components/ui/icon";
import { useState } from "react";
import TableFormModal from "./CreateOrEditTableModal";

type TableStatus = "Available" | "Occupied";

export interface TableCardProps {
  id: number;
  name: string;
  restaurantId: number;
  numberOfSeats: number;
  isAvailable: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const TableCard = ({
  id,
  name,
  restaurantId,
  numberOfSeats,
  isAvailable,
  onEdit,
  onDelete,
}: TableCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const status: TableStatus = isAvailable ? "Available" : "Occupied";
  const statusColor = isAvailable ? "success" : "error";

  const handleEdit = () => onEdit?.(id);
  const handleDelete = () => onDelete?.(id);

  return (
    <Box>
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
            <Badge size="md" variant="solid" action={statusColor}>
              <BadgeText>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </BadgeText>
            </Badge>
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
          <MenuItem key="Delete" textValue="Delete">
            <Icon as={TrashIcon} size="sm" className="mr-2" />
            <MenuItemLabel size="sm">Delete</MenuItemLabel>
          </MenuItem>
        </Menu>
      </HStack>
      {/* <TableFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        id={id}
        onSuccess={() => {
          setIsOpen(false);
          onSuccess?.();
        }}
      /> */}
    </Box>
  );
};
export default TableCard;
