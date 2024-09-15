import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { useLocalAuth } from "@/hooks/useLocalAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

import { authSliceActions } from "@/redux/slices/authSlice";

import { FontAwesome6, FontAwesome } from "@expo/vector-icons";

interface UnmaskTextProps {
  value: string;
  maskCharacter?: string;
  unmaskClassName?: {
    main?: string;
    text?: string;
  };
  hideMaskBtn?: boolean;
}

const UnmaskText = (props: UnmaskTextProps) => {
  const {
    value,
    maskCharacter = "•",
    unmaskClassName = {
      main: "",
      text: "",
    },
    hideMaskBtn = false,
  } = props;

  const { authenticate } = useLocalAuth();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [isMasked, setIsMasked] = useState(true);

  const toggleMask = async () => {
    // Remask data
    if (!isMasked) {
      dispatch(authSliceActions.setRevealSensitiveData(false));
      setIsMasked(true);
      return;
    }

    const authRes = await authenticate();

    if (authRes.success) {
      dispatch(authSliceActions.setRevealSensitiveData(true));
      setIsMasked(false);
    }
  };

  const displayText = isMasked ? maskCharacter.repeat(12) : value;

  useEffect(() => {
    if (authState.isSensitiveDataVisible) {
      setIsMasked(false); // Unlock sensitive data
    } else {
      setIsMasked(true); // Lock sensitive data
    }
  }, [authState.isSensitiveDataVisible]);

  return (
    <View className={`flex-row items-center ${unmaskClassName.main}`}>
      <Text className={`text-base text-black ${unmaskClassName.text}`}>
        {displayText}
      </Text>
      {!hideMaskBtn && (
        <TouchableOpacity onPress={toggleMask} className="ml-2 p-1">
          <View>
            {isMasked ? (
              <FontAwesome6 name="eye" size={22} color="black" />
            ) : (
              <FontAwesome6 name="eye-slash" size={22} color="black" />
            )}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UnmaskText;
