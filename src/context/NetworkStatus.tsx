// NetworkStatusProvider.js
import { useEffect, useRef } from "react";
import { usePathname } from "expo-router";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import { authSliceActions } from "@/redux/slices/authSlice";

import useToast from "@/hooks/useToast";

const NetworkStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { errorToast, successToast } = useToast();
  const dispatch = useAppDispatch();
  const isLoginDisabled = useAppSelector((state) => state.auth.isLoginDisabled);

  const isDisconnected = useRef<boolean>(false);

  // Exclude route that needed redirect to login
  const excludeRoute = ["/login", "/"];

  useEffect(() => {
    const handleNetworkChange = (state: NetInfoState) => {
      // console.log(`isConnected: ${state.isConnected}`);
      // console.log(`isLoginDisabled: ${isLoginDisabled}`);

      if (state.isConnected === false) {
        isDisconnected.current = true;

        errorToast(
          "No Internet Connection",
          "Please check your internet connection.",
          { visibilityTime: 0, autoHide: false }
        );

        if (!isLoginDisabled) {
          dispatch(authSliceActions.setLoginDisabled(true));
        }

        if (!excludeRoute.includes(pathname)) {
          dispatch(authSliceActions.redirectLogin(true));
        }
      } else {
        if (isDisconnected.current) {
          successToast("Internet Connection Restored", "You are back online.");

          if (isLoginDisabled) {
            dispatch(authSliceActions.setLoginDisabled(false));
          }
          isDisconnected.current = false;
        }
      }
    };

    const unsubscribe = NetInfo.addEventListener(handleNetworkChange);

    return () => {
      unsubscribe();
    };
  }, [isLoginDisabled]);

  return children;
};

export { NetworkStatusProvider };
