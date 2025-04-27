import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useDispatch } from "react-redux";
import { setCurrentRestaurant } from "../store/restaurant.slice";
import { AppDispatch } from "@/store/store";
import { restaurantApi } from "../api/restaurant.api";

export interface RestaurantCardForAdminProps {
  id: number;
  uri: string;
  name: string;
  address: string;
  openingTime: string;
  closingTime: string;
}

const screenWidth = Dimensions.get("window").width;

const RestaurantCardForAdmin = ({
  id,
  uri,
  name,
  address,
  openingTime,
  closingTime,
}: RestaurantCardForAdminProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handlePress = async () => {
    const { data } = await dispatch(
      restaurantApi.endpoints.findOneRestaurantForAdmin.initiate(id)
    );
    if (data) {
      dispatch(setCurrentRestaurant(data.data));
      router.push(`/admin/restaurant/${id}`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Card
        style={{
          width: "100%",
          marginBottom: 8,
          marginRight: 8,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <Image
          source={{ uri }}
          alt={name}
          style={{
            width: "100%",
            height: (screenWidth * 2) / 5,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <Heading size="xl" style={{ marginBottom: 8 }}>
          {name}
        </Heading>

        <HStack className="items-center" style={{ marginBottom: 4 }}>
          <Ionicons name="location-outline" size={16} color="gray" />
          <Text className="text-sm text-gray-500 mb-2">{address}</Text>
        </HStack>

        <HStack className="items-center">
          <Ionicons name="time-outline" size={16} color="gray" />
          <Text className="text-sm text-gray-500">
            {openingTime} - {closingTime}
          </Text>
        </HStack>
      </Card>
    </TouchableOpacity>
  );
};

export default RestaurantCardForAdmin;
