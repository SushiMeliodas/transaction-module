import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { CardProps } from "@/types/component.type";

const Card = (props: CardProps) => {
  const {
    children,
    title,
    onPress,
    cardClassName = { card: "", title: "", content: "" },
  } = props;

  return (
    <View
      className={`bg-white rounded-lg shadow-md p-4  ${cardClassName.card}`}
    >
      {/* Card Title */}
      {title && (
        <Text
          className={`text-lg font-semibold text-gray-800 mb-2 ${cardClassName.title}`}
        >
          {title}
        </Text>
      )}

      {/* Card Content */}
      <View className={`p-3 ${cardClassName.content}`}>{children}</View>

      {/* Optional Button */}
      {onPress && (
        <TouchableOpacity
          onPress={onPress}
          className="bg-blue-500 rounded-md py-2 px-4 self-start"
        >
          <Text className="text-white text-center font-medium">Learn More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Card;
