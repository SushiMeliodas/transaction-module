import { Text, View, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AccountPanel from "../components/AccountPanel";
import QuickPayPanel from "../components/QuickPayPanel";
import TransactionHistoryPanel from "../components/TransactionHistoryPanel";

const Section = ({ children }: { children: React.ReactNode }) => {
  return <View className="mx-4 mb-5">{children}</View>;
};

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-background h-full">
      <View className=" flex-row gap-4 items-center px-4 mb-5">
        <View className=" flex-row gap-4 items-center">
          <Image
            source={require("@/assets/icons/user/avatar.png")}
            className="h-14 w-14 rounded-full"
            resizeMode="cover"
          />
          <View>
            <Text className="text-textMuted text-sm">Welcome Back</Text>
            <Text className="text-textMain font-bold text-lg">John Smith</Text>
          </View>
        </View>
      </View>

      <Section>
        <AccountPanel />
      </Section>

      <Section>
        <QuickPayPanel />
      </Section>

      <Section>
        <TransactionHistoryPanel />
      </Section>
    </SafeAreaView>
  );
};

export default HomeScreen;
