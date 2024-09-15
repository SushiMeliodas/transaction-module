import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useAppDispatch } from "@/hooks/useReduxHooks";
import { useLocalAuth } from "@/hooks/useLocalAuth";

import { authSliceActions } from "@/redux/slices/authSlice";

import ActionButton from "@/components/common/ActionButton";

const Login = () => {
  const { authenticate } = useLocalAuth();
  const dispatch = useAppDispatch();

  const onLoginPress = async () => {
    const authResult = await authenticate();

    if (authResult && authResult.success)
      dispatch(authSliceActions.setAuthenticatedData());

    return router.replace("/(root)/(tabs)/history");
  };

  return (
    <SafeAreaView className="flex-1 bg-white  p-5">
      <View className="flex-col justify-center items-center h-full">
        <Text className="text-lg">Login to view your Transaction history</Text>

        <ActionButton
          title="Login"
          onPress={onLoginPress}
          className="w-10/12 mt-12 bg-slate-800"
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
