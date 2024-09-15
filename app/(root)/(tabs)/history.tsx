import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Timeline from "@/components/Timeline";

const History = () => {
  return (
    // <SafeAreaView className="flex-1 bg-white" edges={["right", "left"]}>
    <SafeAreaView className="flex-1 bg-white" edges={["right", "left", "top"]}>
      <View className="p-5">
        {/* <ScrollView className="p-5"> */}
        <Text className="text-4xl">History</Text>
        <Timeline />
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default History;
