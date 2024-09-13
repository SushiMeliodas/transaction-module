import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Timeline from "@/components/Timeline";

const History = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-5 box-border">
      <Text className="text-xl">History</Text>
      <Timeline />
    </SafeAreaView>
  );
};

export default History;
