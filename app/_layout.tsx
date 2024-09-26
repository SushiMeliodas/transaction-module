import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

import store from "@/redux";

import { UserInactivityProvider } from "@/context/UserInactivity";
import { NetworkStatusProvider } from "@/context/NetworkStatus";
import { AuthGuard } from "@/context/AuthGuard";

import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Provider store={store}>
        <GestureHandlerRootView>
          <BottomSheetModalProvider>
            <NetworkStatusProvider>
              <AuthGuard>
                {/* <UserInactivityProvider> */}
                <SafeAreaProvider>
                  <Stack>
                    <Stack.Screen
                      name="index"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(auth)"
                      options={{
                        gestureEnabled: false, // Handle not allow login swipe back
                        headerShown: false,
                      }}
                    />
                    <Stack.Screen
                      name="(root)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(modal)/inactive"
                      options={{ headerShown: false, animation: "none" }}
                    />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                </SafeAreaProvider>
                {/* </UserInactivityProvider> */}
              </AuthGuard>
            </NetworkStatusProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </Provider>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Toast topOffset={60} />
    </>
  );
}
