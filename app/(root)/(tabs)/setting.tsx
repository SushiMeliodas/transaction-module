import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { useAppDispatch } from "@/hooks/useReduxHooks";

import { financeSliceActions } from "@/redux/slices/financeSlice";
import { authSliceActions } from "@/redux/slices/authSlice";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import Card from "@/components/common/Card";

const Setting = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(financeSliceActions.resetState());
    dispatch(authSliceActions.resetState());
    router.replace("/(auth)/login");
  };

  const settings = [
    {
      label: "Logout",
      icon: <FontAwesome6 name="power-off" size={24} color="black" />,
      callback: handleLogout,
    },
  ];

  return (
    <SafeAreaView>
      <View className="p-4">
        <Text className="font-bold text-3xl">Setting</Text>
      </View>

      <View className="p-3">
        <Card>
          {settings.map((setting, index) => (
            <TouchableOpacity
              key={setting.label}
              className="border border-l-zinc-800 rounded-lg py-2 px-4 flex-row items-center justify-between"
              onPress={setting.callback}
            >
              {setting.icon}
              <Text className="text-lg font-semibold">{setting.label}</Text>
            </TouchableOpacity>
          ))}
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
