import ActionButton from "@/components/ActionButton";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const onLoginPress = () => {};

  return (
    <SafeAreaView className="bg-white">
      <View className="flex flex-col items-center justify-center h-full p-5 gap-8 box-border">
        <Text>Login to view your Transaction history.</Text>

        <ActionButton title="Login" onPress={onLoginPress} />
      </View>
    </SafeAreaView>
  );
};

export default Login;
