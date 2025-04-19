import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";

export interface RestaurantListItemForAdminProps {
  id: number;
  name: string;
  address: string;
  openingTime: string;
  closingTime: string;
  imageUrl: string;
}
const RestaurantListItemForAdmin = ({
  id,
  name,
  address,
  openingTime,
  closingTime,
  imageUrl,
}: RestaurantListItemForAdminProps) => {
  return (
    <Box>
      <Image
        source={{ uri: imageUrl }}
        className="w-full h-32 rounded-lg "
        alt={name}
        resizeMode="cover"
      />
      <VStack>
        <Text className="text-lg font-semibold mt-2">{name}</Text>
        <Text className="text-sm text-gray-500">{address}</Text>
        <HStack className="mt-2">
          <Ionicons name="time-outline" size={16} color="gray" />
          <Text className="text-sm text-gray-500 ml-1">
            {openingTime} - {closingTime}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RestaurantListItemForAdmin;
