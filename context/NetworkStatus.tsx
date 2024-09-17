// NetworkStatusProvider.js
import { useEffect, useRef } from "react";
import { usePathname } from "expo-router";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

import { useAppDispatch } from "@/hooks/useReduxHooks";
import { authSliceActions } from "@/redux/slices/authSlice";

import useToast from "@/hooks/useToast";

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
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

        dispatch(authSliceActions.setLoginDisabled(true));

        if (pathname !== "/login") {
          dispatch(authSliceActions.redirectLogin(true));
        }
      } else {
        if (isDisconnected.current) {
          successToast("Internet Connection Restored", "You are back online.");

          dispatch(authSliceActions.setLoginDisabled(false));
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
