import React from "react";
import { View, Text } from "react-native";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = (props: CardProps) => {
  const { children, className } = props;

  return (
    <View
      className={`shadow-lg shadow-black/40 bg-surfaceMint rounded-2xl ${className}`}
    >
      {children}
    </View>
  );
};
