import { Stack, Slot } from "expo-router";

const TabsLayout = () => {
  return <Slot />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="portfolio" options={{ headerShown: false }} />
      {/* <Stack.Screen name="history-detail" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default TabsLayout;
