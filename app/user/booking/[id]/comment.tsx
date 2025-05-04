import CreateComment from "@/features/comments/screens/CreateComment";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";
import { Box } from "@/components/ui/box";
import { Image } from "expo-image";
import { FlatList } from "react-native";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Icon, MessageCircleIcon } from "@/components/ui/icon";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { clearCurrentRestaurant } from "@/features/restaurants/store/restaurant.slice";
import { useFindOneRestaurantForUserQuery } from "@/features/restaurants/api/restaurant.api";

export default function CommentScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const booking = useSelector(
    (state: RootState) => state?.booking?.currentBooking
  );
  console.log("booking", booking);
  const { data: restaurant } = useFindOneRestaurantForUserQuery(
    booking?.restaurantId
  );
  console.log("restaurant", restaurant);

  useEffect(() => {
    return () => {
      dispatch(clearCurrentRestaurant());
    };
  }, [dispatch]);

  const isMainImage = restaurant?.data?.images?.[0];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Comment",
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
                {restaurant?.data?.name}
              </Heading>

              <HStack className="items-center" style={{ marginBottom: 8 }}>
                <Ionicons name="location-outline" size={16} color="gray" />
                <Text className="text-gray-500">
                  {restaurant?.data?.address}
                </Text>
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
          <Text>{restaurant?.data?.description}</Text>
        </Box>

        <Box style={styles.box}>
          <HStack
            className="justify-between items-center"
            style={{ marginBottom: 8 }}
          >
            <Heading size="md">Comment</Heading>
          </HStack>
          <CreateComment />
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
