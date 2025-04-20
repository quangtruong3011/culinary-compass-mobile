import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "expo-image";
import { Dimensions, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

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
  return (
    <Link href={`/user/restaurant/${id}`} asChild>
      <TouchableOpacity>
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
          <Heading size="md" className="text-2xl">
            {name}
          </Heading>
          <Text className="text-sm text-gray-500 mb-2">{address}</Text>

          <HStack className="items-center">
            <Ionicons name="time-outline" size={16} color="gray" />
            <Text className="text-sm text-gray-500">
              {openingTime} - {closingTime}
            </Text>
          </HStack>
        </Card>
      </TouchableOpacity>
    </Link>
  );
};

export default RestaurantCardForUser;
