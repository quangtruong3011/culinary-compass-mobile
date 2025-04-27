import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "expo-image";
import { Dimensions, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { restaurantApi } from "../api/restaurant.api";
import { AppDispatch } from "@/store/store";
import { setCurrentRestaurant } from "../store/restaurant.slice";

interface RestaurantCardForUserProps {
  id: number;
  uri: string;
  name: string;
  address: string;
  openingTime: string;
  closingTime: string;
}

const screenWidth = Dimensions.get("window").width;

const RestaurantCardForUser = ({
  id,
  uri,
  name,
  address,
  openingTime,
  closingTime,
}: RestaurantCardForUserProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handlePress = async () => {
    const { data } = await dispatch(
      restaurantApi.endpoints.findOneRestaurantForUser.initiate(id)
    );
    if (data) {
      dispatch(setCurrentRestaurant(data.data));
      router.push(`/user/restaurant/${id}`);
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

export default RestaurantCardForUser;
