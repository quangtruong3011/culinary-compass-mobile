import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { AppDispatch, RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";
import { Icon, MessageCircleIcon } from "@/components/ui/icon";
import CreateOrEditBooking from "@/features/bookings/screens/CreateOrEditBooking";
import { clearCurrentRestaurant } from "@/features/restaurants/store/restaurant.slice";
import { useEffect } from "react";
import { Image } from "expo-image";
import { FlatList } from "react-native";

export default function RestaurantDetailScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const restaurant = useSelector(
    (state: RootState) => state?.restaurant?.currentRestaurant
  );

  useEffect(() => {
    return () => {
      dispatch(clearCurrentRestaurant());
    };
  }, [dispatch]);

  const isMainImage = restaurant?.images?.[0];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: `${restaurant?.name}`,
        }}
      />

      <ScrollView>
        <Box
          style={{
            position: "relative",
            marginBottom: 40,
          }}
        >
          <Image
            source={isMainImage}
            style={{ width: "100%", height: 250, objectFit: "cover" }}
          />
          <Box
            style={{
              position: "absolute",
              bottom: -50,
              left: 0,
              right: 0,
              padding: 16,
              backgroundColor: "white",
              borderRadius: 8,
            }}
          >
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
            <Heading size="md">Images</Heading>
          </HStack>
          <FlatList
            data={restaurant?.images}
            renderItem={({ item }) => (
              <Image
                source={item}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <Box style={{ width: 12 }} />}
          />
        </Box>

        <Box style={styles.box}>
          <HStack
            className="justify-between items-center"
            style={{ marginBottom: 8 }}
          >
            <Heading size="md">Booking</Heading>
          </HStack>
          <CreateOrEditBooking />
        </Box>
      </ScrollView>
    </>
  );
}

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
