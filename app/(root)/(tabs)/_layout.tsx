import { Tabs } from "expo-router";
import { View } from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabIcon = ({ name, focused }: TabIconProps) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full 
        bg-general-300  p-0.5 ${
          focused ? "border border-gray-800 shadow-md" : ""
        }`}
  >
    <View className={`rounded-full w-6 h-6 items-center justify-center `}>
      <MaterialIcons name={name} size={24} color="black" />
    </View>
  </View>
);

const Layout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          color: "black",
        },
        tabBarStyle: {
          height: 85,
        },
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerTitle: "History",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="history" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          headerTitle: "Setting",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon name="settings" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
