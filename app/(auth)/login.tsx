import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { authenticateAsync } from "expo-local-authentication";

import ActionButton from "@/components/ActionButton";

const Login = () => {
  const onLoginPress = async () => {
    const bioRes = await authenticateAsync();

    console.warn(bioRes);

    // router.replace("/(root)/(tabs)/history");
  };

  return (
    <SafeAreaView className="flex-1 bg-white  p-5">
      <View className="flex-col justify-center items-center h-full">
        <Text className="text-lg">Login to view your Transaction history</Text>

        <ActionButton
          title="Login"
          onPress={onLoginPress}
          className="w-10/12 mt-12"
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
