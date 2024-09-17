import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import useLocalAuth from "@/hooks/useLocalAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import useActivityTracker from "@/hooks/useActivityTracker";

import { authSliceActions } from "@/redux/slices/authSlice";

import { UnmaskTextProps } from "@/types/component.type";

import { FontAwesome6 } from "@expo/vector-icons";

const UnmaskText = (props: UnmaskTextProps) => {
  const {
    value,
    maskCharacter = "•",
    unmaskClassName = {
      main: "",
      text: "",
    },
    hideMaskBtn = false,
    textColor = "text-black",
  } = props;

  const { reActiveIdle } = useActivityTracker();
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

    reActiveIdle();
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
      <Text
        className={`text-base ${isMasked ? "text-black" : textColor} ${
          unmaskClassName.text
        }`}
      >
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
