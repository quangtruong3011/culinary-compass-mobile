import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function RestaurantDetailForAdminScreen() {
  const { id } = useLocalSearchParams();

  const options = [
    {
      id: "tables",
      label: "Tables",
      icon: "table",
      href: `/admin/restaurant/${id}/table` as const,
    },
  ];
  return (
    <>
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
              marginBottom: 8,
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
      </VStack>
    </>
  );
}
