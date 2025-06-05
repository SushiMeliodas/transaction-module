import { useRef, useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { View, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useAppSelector } from "@/hooks/useReduxHooks";

import HomeHeader from "@/features/home/components/HomeHeader";

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

const TabsLayout = () => {
  // const hideTabBar = useAppSelector((state) => state.general.hideTabBar);

  const tabBarHeight = 85;
  // const tabBarPosition = useRef(new Animated.Value(0)).current; // Start with tab bar visible (0 offset)
  // const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  // const hideTabBarAnimated = () => {
  //   Animated.timing(tabBarPosition, {
  //     toValue: tabBarHeight, // Slide tab bar down by its height (hide)
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     // Once the animation finishes, we hide the tab bar completely
  //     setIsTabBarVisible(false);
  //   });
  // };

  // const showTabBarAnimated = () => {
  //   setIsTabBarVisible(true);
  //   Animated.timing(tabBarPosition, {
  //     toValue: 0, // Slide tab bar back up (show)
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // };

  // useEffect(() => {
  //   if (hideTabBar) {
  //     hideTabBarAnimated(); // Hide the tab bar when `hideTabBar` is true
  //   } else {
  //     showTabBarAnimated(); // Show the tab bar when `hideTabBar` is false
  //   }
  // }, [hideTabBar]);

  return (
    <Tabs
      screenOptions={{
        // tabBarActiveTintColor: "white",
        // tabBarInactiveTintColor: "white",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          color: "black",
        },
        tabBarStyle: {
          // height: "auto",
          // display: hideTabBar ? "none" : "flex",
          // height: tabBarHeight,
          // transform: [
          //   { translateY: tabBarPosition }, // Apply sliding animation
          // ],
          // display: isTabBarVisible ? "flex" : "none",
        },
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          title: "Home",
          // headerTitle: "Home",
          headerShown: false,
          // header: () => <HomeHeader />,
          tabBarIcon: ({ color, focused }) => (
            <Feather name="home" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
          headerTitle: "Transaction",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Feather name="clock" color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          headerTitle: "Setting",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Feather name="settings" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
