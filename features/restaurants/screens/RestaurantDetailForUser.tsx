import { useFindRestaurantForUserQuery } from "../api/restaurant.api";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Icon, MessageCircleIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Select } from "@/components/ui/select";
import SelectTable from "@/app/user/booking/selectTable";
import CreateBookingForm from "@/features/bookings/screens/CreateBookingForm";

interface RestaurantDetailForUserProps {
  id: string;
}

const RestaurantDetailForUser = ({ id }: RestaurantDetailForUserProps) => {
  const { data, isLoading, isError } = useFindRestaurantForUserQuery(id);

  const restaurant = data?.data;
  return (
    <ScrollView>
      <Box style={styles.box}>
        <VStack className="items-center" style={{ marginBottom: 16 }}>
          <Heading size="lg" style={{ marginBottom: 8 }}>
            {restaurant?.name}
          </Heading>

          <HStack className="items-center" style={{ marginBottom: 8 }}>
            <Ionicons name="location-outline" size={16} color="gray" />
            <Text className="text-gray-500">{restaurant?.address}</Text>
          </HStack>
        </VStack>
      </Box>
      <Box style={styles.box}>
        <HStack
          className="justify-between items-center"
          style={{ marginBottom: 8 }}
        >
          <Heading size="md">Description</Heading>
          <Icon as={MessageCircleIcon} size="md" />
        </HStack>
        <Text>{restaurant?.description}</Text>
      </Box>

      <Box style={styles.box}>
        <HStack
          className="justify-between items-center"
          style={{ marginBottom: 8 }}
        >
          <Heading size="md">Booking</Heading>
        </HStack>
        <CreateBookingForm />
      </Box>
    </ScrollView>
  );
};

export default RestaurantDetailForUser;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
