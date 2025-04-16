import { StyleSheet } from "react-native";
import UserAppNotificationBar from "@/features/restaurants/screens/UserAppNotificationBar";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";

export default function RestaurantScreen() {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  return (
    <ThemedView>
      <UserAppNotificationBar
        avtUrl="https://example.com/avatar.jpg"
        appName="Culinary Compass"
        notificationCount={5}
      />
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <Animated.View>
          <Link
            href="/admin/restaurant/create"
            style={{
              color: "#000",
              backgroundColor: "#fff",
              padding: 16,
              borderRadius: 8,
              marginBottom: 16,
            }}
          >
            Create Restaurant
          </Link>
        </Animated.View>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    color: "#000",
    backgroundColor: "#fff",
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
