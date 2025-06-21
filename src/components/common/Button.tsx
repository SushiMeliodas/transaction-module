import { Pressable, Text } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  label?: string;
  variant?:
    | "primary"
    | "secondary"
    // | "danger"
    // | "success"
    | "outline"
    | "white";
  [key: string]: any; // Allow additional props
}

const Button = (props: ButtonProps) => {
  const {
    children,
    variant = "primary",
    onPress,
    className,
    label,
    ...rest
  } = props;

  const getVariantStyle = () => {
    const variantStyles = {
      primary: {
        button: "bg-primary",
        text: "text-white",
      },
      secondary: {
        button: "bg-accentAqua",
        text: "text-textMain",
      },
      outline: {
        button: "bg-transparent border-neutral-300 border-[0.5px]",
        text: "text-neutral-700",
      },
      white: {
        button: "bg-white",
        text: "text-neutral-700",
      },
    };

    return variantStyles[variant] || variantStyles.primary;
  };

  return (
    <Pressable
      className={` ${
        getVariantStyle().button
      } border-[0.5px] border-neutral-300/50 px-4 py-3 rounded-2xl ${className}`}
      onPress={onPress}
      {...rest}
    >
      {children || (
        <Text className={`${getVariantStyle().text} text-xl text-center`}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
