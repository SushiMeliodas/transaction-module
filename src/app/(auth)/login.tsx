import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import useAuthorization from "@/hooks/useAuthorization";

import { authSliceActions } from "@/redux/slices/authSlice";

import Button from "@/components/common/Button";

const Login = () => {
  const { authenticate } = useAuthorization();
  const dispatch = useAppDispatch();
  const isLoginDisabled = useAppSelector((state) => state.auth.isLoginDisabled);

  // console.log(`isLoginDisabled: ${isLoginDisabled}`);

  const onLoginPress = async () => {
    const authResult = await authenticate();

    if (authResult && authResult.success) {
      dispatch(authSliceActions.setAuthenticatedData());
      return router.replace("/");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white  p-5">
      <View className="flex-col justify-center items-center h-full">
        <Text className="text-xl font-semibold mb-12">
          Login to view your Transaction history
        </Text>

        <Button
          className="w-full"
          disabled={isLoginDisabled}
          onPress={onLoginPress}
        >
          <Text className="text-center text-white text-lg font-semibold">
            Login with Biometric
          </Text>
        </Button>

        {isLoginDisabled && (
          <Text className="text-red-500 font-bold text-base">
            Unable to log in due to network issues.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Login;
