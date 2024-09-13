import React from "react";
import { TextInputProps, TouchableOpacityProps } from "react-native";

export interface CardProps {
  children?: React.ReactNode;
  title?: string;
  onPress?: () => void;
  cardClassName?: {
    card?: string;
    title?: string;
    content?: string;
  };
}

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}
