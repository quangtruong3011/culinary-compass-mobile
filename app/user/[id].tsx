import CreateOrEditUser from "@/features/users/screens/CreateOrEditUser";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function MyProfile() {
  return (
    <>
      <Stack.Screen
        name="(tabs)/profile"
        options={{
          title: "My Profile",
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />
      <ScrollView>
        <CreateOrEditUser />
      </ScrollView>
    </>
  );
}
