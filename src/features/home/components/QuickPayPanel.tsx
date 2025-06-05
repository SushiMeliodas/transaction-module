import { View, Text, Image, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

const QuickPayPanel = () => {
  const handleQuickPayPress = () => {
    console.log("Quick Pay pressed");
  };

  const recipientList = [
    { name: "John Doe", image: require("@/assets/icons/quickpay/avatar.png") },
    {
      name: "Jane Smith",
      image: require("@/assets/icons/quickpay/avatar.png"),
    },
    {
      name: "Alice Johnson",
      image: require("@/assets/icons/quickpay/avatar.png"),
    },
  ];

  return (
    <View className="gap-3">
      <Text className="text-textMain ">Quick Pay</Text>
      <View className="flex-row gap-4 mx-auto">
        {recipientList.map((recipient, index) => (
          <Pressable
            key={index}
            className="gap-2 w-20"
            onPress={() => handleQuickPayPress()}
          >
            <Image
              source={recipient.image}
              className="h-20 w-20 rounded-full"
              resizeMode="cover"
            />
            <Text numberOfLines={1} ellipsizeMode="tail">
              {recipient.name}
            </Text>
          </Pressable>
        ))}
        <Pressable onPress={() => handleQuickPayPress()}>
          <View className="h-20 w-20 rounded-full border border-neutral-300 items-center justify-center">
            <Feather name="more-horizontal" size={24} color="black" />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default QuickPayPanel;
