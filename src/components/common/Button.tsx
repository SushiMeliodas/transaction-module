import { Pressable } from "react-native";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  className?: string;
  [key: string]: any; // Allow additional props
}

const Button = (props: ButtonProps) => {
  const { children, onPress, className, ...rest } = props;

  return (
    <Pressable
      className={`border border-neutral-300 bg-primary px-3 py-2 rounded-lg ${className}`}
      onPress={onPress}
      {...rest}
    >
      {children}
    </Pressable>
  );
};

export default Button;
