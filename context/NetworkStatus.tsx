// NetworkStatusProvider.js
import { useEffect } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    let errorToastId: void | undefined;

    const handleNetworkChange = (state: NetInfoState) => {
      if (!state.isConnected) {
        errorToastId = Toast.show({
          type: "error",
          position: "top",
          text1: "No Internet Connection",
          text2: "Please check your internet connection.",
          visibilityTime: 0,
          autoHide: false,
        });
      } else {
        if (errorToastId) {
          Toast.hide(errorToastId);
          Toast.show({
            type: "success",
            position: "bottom",
            text1: "Internet Connection Restored",
            text2: "You are back online.",
            visibilityTime: 4000,
          });
        }
      }
    };

    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

    return () => {
      unsubscribe();
    };
  }, []);

  return children;
};

export { NetworkStatusProvider };
