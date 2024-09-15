import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@/hooks/useReduxHooks";

import { formatAmount } from "@/utils";

import Timeline from "@/components/Timeline";
import UnmaskText from "@/components/common/UnmaskText";

const History = () => {
  const balanceState = useAppSelector((state) => state.finance.balance);
  const authState = useAppSelector((state) => state.auth);

  return (
    // <SafeAreaView className="flex-1 bg-white" edges={["right", "left"]}>
    <SafeAreaView className="flex-1 bg-white" edges={["right", "left", "top"]}>
      <View className="p-5">
        <View className="flex-row justify-between">
          <Text className="text-lg font-semibold">Balance :</Text>
          <Text className="text-lg font-semibold">
            Hi, {authState.user.name}
          </Text>
        </View>
        <UnmaskText
          value={formatAmount(balanceState)}
          unmaskClassName={{
            main: "mb-3",
            text: "text-3xl",
          }}
        />
        <Timeline />
      </View>
    </SafeAreaView>
  );
};

export default History;
