import { View, Text } from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { Card } from "@/components/common/Card";
import Button from "@/components/common/Button";

const TransactionHistoryPanel = () => {
  const handleMoreTransactions = () => {
    router.navigate("/transaction/");
  };

  return (
    <View className="gap-3">
      <Text className="text-textMain">Recent Transaction</Text>
      <Card className="p-4 bg-accentAqua">
        <View className="flex-row items-center justify-between">
          <Text className="">123</Text>
          <Button onPress={handleMoreTransactions}>
            <Feather name="arrow-right" size={20} color="white" />
          </Button>
        </View>
      </Card>
    </View>
  );
};

export default TransactionHistoryPanel;
