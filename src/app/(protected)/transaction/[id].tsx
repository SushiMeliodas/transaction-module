import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useAppSelector } from "@/hooks/useReduxHooks";

import { formatAmount } from "@/utils/number";

import Button from "@/components/common/Button";

const HistoryDetail = () => {
  const historyDetail = useAppSelector(
    (state) => state.finance.history.details
  );

  const descriptions = [
    { label: "Date", value: historyDetail.date },
    { label: "Description", value: historyDetail.description },
    { label: "Reference", value: historyDetail.reference },
  ];

  const onPressBack = () => {
    router.back();
  };

  return (
    <SafeAreaView>
      <View className="h-full">
        <View className="p-4">
          <Text className="font-bold text-3xl">Transaction Details</Text>
        </View>
        <View className="p-5">
          <View className="mb-6">
            <Text className="font-semibold text-2xl">Amount (MYR)</Text>
            <Text
              className={`font-medium text-2xl ${
                historyDetail.type === "credit"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {formatAmount(historyDetail.amount, historyDetail.type, "")}
            </Text>
          </View>

          {descriptions.map((description, index) => (
            <View
              key={description.label}
              className="flex-row justify-between items-center p-2"
            >
              <View className="flex-1">
                <Text className="font-semibold text-lg">
                  {description.label}
                </Text>
              </View>
              <View className="flex-1 items-end">
                <Text className="font-normal text-lg text-right">
                  {description.value}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View className="items-center px-5 mt-auto mb-5">
          <Button className="w-full" onPress={onPressBack}>
            <Text className="text-white text-center text-xl">Back</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistoryDetail;
