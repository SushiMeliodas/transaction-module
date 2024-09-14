import { Tabs } from "expo-router";
import { View } from "react-native";
import { TabIconProps } from "@/types/type";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// const TabIcon = ({ name, focused }: TabIconProps) => (
//   <MaterialIcons name={name} size={24} color="white" />
// );

const TabIcon = ({ name, focused }: TabIconProps) => (
  <View
    // className={`flex flex-row justify-center items-center rounded-full ${
    //   focused ? "bg-general-300" : ""
    // }`}
    className={`flex flex-row justify-center items-center rounded-full 
        border-l-orange-600`}
  >
    <View
      //   className={`rounded-full w-12 h-12 items-center justify-center ${
      //     focused ? "bg-general-400" : ""
      //   }`}
      className={`rounded-full w-12 h-12 items-center justify-center border-l-orange-600`}
    >
      <MaterialIcons name={name} size={40} color="black" />
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
        tabBarShowLabel: false,
        // tabBarStyle: {
        //   backgroundColor: "#333333",
        //   borderRadius: 50,
        //   paddingBottom: 0, // ios only
        //   overflow: "hidden",
        //   marginHorizontal: 20,
        //   marginBottom: 20,
        //   height: 78,
        //   display: "flex",
        //   justifyContent: "space-between",
        //   alignItems: "center",
        //   flexDirection: "row",
        //   position: "absolute",
        // },
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          // title: "History",
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
