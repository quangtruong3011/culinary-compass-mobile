import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { TrashIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRemoveRestaurantMutation } from "@/features/restaurants/api/restaurant.api";
import { clearCurrentRestaurant } from "@/features/restaurants/store/restaurant.slice";
import { AppDispatch, RootState } from "@/store/store";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function RestaurantDetailForAdminScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const restaurant = useSelector(
    (state: RootState) => state.restaurant?.currentRestaurant
  );
  const id = restaurant?.id;
  const router = useRouter();

  useEffect(() => {
    return () => {
      dispatch(clearCurrentRestaurant());
    };
  }, [dispatch]);

  const [remove, { isLoading: isRemoving }] = useRemoveRestaurantMutation();

  const handleDelete = async () => {
    Alert.alert(
      "Are you sure?",
      `Are you sure you want to delete restaurant "${restaurant?.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await remove(id as number).unwrap();
            router.push({
              pathname: "/admin/(tabs)/restaurant",
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const options = [
    {
      id: "info",
      label: "Infomation",
      icon: "information-circle",
      href: `/admin/restaurant/${id}/info` as const,
    },
    {
      id: "tables",
      label: "Tables",
      icon: "table",
      href: `/admin/restaurant/${id}/table` as const,
    },
    {
      id: "booking",
      label: "Booking",
      icon: "calendar",
      href: `/admin/restaurant/${id}/booking` as const,
    },
  ];

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Restaurant Details",
        }}
      />
      <VStack space="xl">
        {options.map((option) => (
          <Link
            key={option.id}
            href={option.href}
            style={{
              width: "100%",
              padding: 16,
              borderRadius: 8,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
              elevation: 2,
            }}
            asChild
          >
            <TouchableOpacity>
              <HStack className="justify-between items-center">
                <Text size="xl">{option.label}</Text>
                <Ionicons name="chevron-forward" size={16} color="gray" />
              </HStack>
            </TouchableOpacity>
          </Link>
        ))}
        <Button size="lg" onPress={handleDelete} disabled={isRemoving}>
          <ButtonIcon as={TrashIcon} />
          <ButtonText>Delete</ButtonText>
        </Button>
      </VStack>
    </ScrollView>
  );
}
