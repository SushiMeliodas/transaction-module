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
  bgVariant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "success"
    | "white";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

export interface UnmaskTextProps {
  value: string;
  maskCharacter?: string;
  unmaskClassName?: {
    main?: string;
    text?: string;
  };
  hideMaskBtn?: boolean;
  textColor?: string;
}

export interface ModalBottomSheetProps {
  title: string;
  message?: string;
  content?: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  className?: string;
  hideClose?: boolean;
}
