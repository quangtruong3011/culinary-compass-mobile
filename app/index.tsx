import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function IndexScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Link href="/admin/index" style={{ padding: 20 }}>
          Go to Dashboard
        </Link>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
