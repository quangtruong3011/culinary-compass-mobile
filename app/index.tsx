import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function IndexScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Link href="/user" style={{ padding: 20 }}>
          Go to Dashboard
        </Link>
        <Link href="/user/booking/selectRestaurant" style={{ padding: 20 }}>
          Go to Bookings
        </Link>
        <Link href="/admin/table/viewListTable" style={{ padding: 20 }}>
          Go to Table
        </Link>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
