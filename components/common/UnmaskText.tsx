import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useLocalAuth } from "@/hooks/useLocalAuth";

import { FontAwesome6 } from "@expo/vector-icons";

interface UnmaskTextProps {
  value: string;
  maskCharacter?: string;
  unmaskClassName?: {
    main?: string;
    text?: string;
  };
}

const UnmaskText = (props: UnmaskTextProps) => {
  const {
    value,
    maskCharacter = "•",
    unmaskClassName = {
      main: "",
      text: "",
    },
  } = props;

  const { authenticate } = useLocalAuth();

  const [isMasked, setIsMasked] = useState(true);

  const toggleMask = async () => {
    const authRes = await authenticate();

    if (authRes.success) {
      setIsMasked((prevState) => !prevState);
    }
  };

  const displayText = isMasked ? maskCharacter.repeat(12) : value;

  return (
    <View className={`flex-row items-center ${unmaskClassName.main}`}>
      <Text className={`text-base text-black ${unmaskClassName.text}`}>
        {displayText}
      </Text>
      <TouchableOpacity onPress={toggleMask} className="ml-2 p-1">
        <Text className="text-blue-500">
          {isMasked ? (
            <FontAwesome6 name="eye" size={24} color="black" />
          ) : (
            <FontAwesome6 name="eye-slash" size={24} color="black" />
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UnmaskText;
