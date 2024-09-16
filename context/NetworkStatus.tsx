// NetworkStatusProvider.js
import { useEffect } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

import useToast from "@/hooks/useToast";

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const { errorToast, successToast } = useToast();

  useEffect(() => {
    const handleNetworkChange = (state: NetInfoState) => {
      let isDisconnected = false;

      if (!state.isConnected) {
        isDisconnected = true;

        errorToast(
          "No Internet Connection",
          "Please check your internet connection.",
          { visibilityTime: 0, autoHide: false }
        );
      } else {
        if (isDisconnected) {
          successToast("Internet Connection Restored", "You are back online.");

          isDisconnected = false;
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
