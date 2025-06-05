import { Stack } from "expo-router";

const TransactionLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Transaction" }}
      />
    </Stack>
  );
};

export default TransactionLayout;
