import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Image } from "expo-image";
import { Dimensions } from "react-native";
// import { Image } from "@/components/ui/image";

interface RestaurantCardForUserProps {
  id: number;
  uri: string;
  name: string;
}

const screenWidth = Dimensions.get("window").width;

const RestaurantCardForUser = ({
  id,
  uri,
  name,
}: RestaurantCardForUserProps) => {
  return (
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
          height: (screenWidth * 9) / 16,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
      <Heading size="md" className="mb-4">
        {name}
      </Heading>
    </Card>
  );
};

export default RestaurantCardForUser;
