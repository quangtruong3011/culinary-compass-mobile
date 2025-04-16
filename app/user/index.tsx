import { useAuth } from "@/features/auth/hooks/useAuth";
import { View, Text } from "react-native";

export default function UserHome() {
  const { user, is_authenticated } = useAuth();
  return (
    <View>
      <Text>User Home</Text>
      <Text>{JSON.stringify(user)}</Text>
    </View>
  );
}
