import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { Redirect, Tabs } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUserRoles } from "@/features/auth/hooks/useUserRoles";
import { useEffect } from "react";

export default function AdminLayout() {
  const colorScheme = useColorScheme();

  const { isAdmin } = useUserRoles();

  if (!isAdmin) {
    return <Redirect href="/user" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="restaurant"
        options={{
          title: "Restaurants",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="restaurant" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
