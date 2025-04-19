import { Stack } from "expo-router";

export default function RestaurantLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Restaurants",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          title: "Create Restaurant",
        }}
      />
    </Stack>
  );
}
