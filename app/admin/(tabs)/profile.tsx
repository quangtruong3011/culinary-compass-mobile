import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";

export default function ProfileAdminScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Profile Admin Screen</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
