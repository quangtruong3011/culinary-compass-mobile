import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function UserAppNotificationBar({
  avtUrl,
  appName,
  notificationCount,
}: {
  avtUrl: string;
  appName: string;
  notificationCount: number;
}) {
  return (
    <HStack className="items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <Image source={avtUrl} style={styles.image} />
      <Text className="text-lg font-semibold text-gray-800 dark:text-white">
        {appName}
      </Text>
    </HStack>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
