// NetworkStatusProvider.js
import { useEffect, useRef } from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

import { useAppDispatch } from "@/hooks/useReduxHooks";

import useToast from "@/hooks/useToast";

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const { errorToast, successToast } = useToast();
  const dispatch = useAppDispatch();

  const isDisconnected = useRef<boolean>(false);

  useEffect(() => {
    const handleNetworkChange = (state: NetInfoState) => {
      if (!state.isConnected) {
        isDisconnected.current = true;

        errorToast(
          "No Internet Connection",
          "Please check your internet connection.",
          { visibilityTime: 0, autoHide: false }
        );
      } else {
        if (isDisconnected.current) {
          successToast("Internet Connection Restored", "You are back online.");

          isDisconnected.current = false;
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
