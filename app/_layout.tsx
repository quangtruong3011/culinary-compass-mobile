import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthProvider } from "@/features/auth/context/AuthProvider";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useUserRoles } from "@/features/auth/hooks/useUserRoles";

SplashScreen.preventAutoHideAsync();

function MainApp() {
  const { isAdmin } = useUserRoles();
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <GluestackUIProvider mode="light">
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack screenOptions={{ headerShown: false }}>
              {isAdmin ? (
                <Stack.Screen name="admin/(tabs)" />
              ) : (
                <Stack.Screen name="user/(tabs)" />
              )}
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </GluestackUIProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
