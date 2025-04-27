import { View, Text } from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/ui/button";
import { Image } from "expo-image";

const RestaurantListEmpty = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Image
        source={require("@/assets/images/No data-amico.png")}
        style={{ width: 200, height: 200, marginBottom: 24 }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        No restaurants found
      </Text>
      <Text style={{ color: "#64748b", marginBottom: 24, textAlign: "center" }}>
        You haven't added any restaurants yet. Create your first restaurant to
        get started.
      </Text>
      <Link href="/admin/restaurant/create" asChild>
        <Button>
          <Text style={{ color: "white", fontWeight: "500" }}>
            Add First Restaurant
          </Text>
        </Button>
      </Link>
    </View>
  );
};

export default RestaurantListEmpty;
