import { Stack, Slot, Redirect } from "expo-router";

import { useAppSelector } from "@/hooks/useReduxHooks";

const TabsLayout = () => {
  const authState = useAppSelector((state) => state.auth);
  const { isAuthenticated } = authState;

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="transaction/[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default TabsLayout;
