import { useRef, useEffect, useState } from "react";
import { AppState } from "react-native";
import { useRouter } from "expo-router";

import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";

import { authSliceActions } from "@/redux/slices/authSlice";

const LOCK_TIME = 3000;
const WARNING_TIME = 1000;

export const UserInactivityProvider = ({ children }: any) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { isAuthenticated, authInactivityOnly, isSensitiveDataVisible } =
    authState;

  const [cameFromInactive, setCameFromInactive] = useState(false);

  const handleAppStateChange = (nextAppState: any) => {
    // console.log("appState", appState.current, nextAppState);
    console.log(authInactivityOnly, isAuthenticated, isSensitiveDataVisible);

    if (nextAppState === "inactive" && !authInactivityOnly) {
      setCameFromInactive(true);
      router.push("/(modal)/inactive");
    } else {
      if (authInactivityOnly) {
        dispatch(authSliceActions.setAuthActivity(false));
      } else if (cameFromInactive && router.canGoBack()) {
        setCameFromInactive(false);
        router.back();
      }
    }

    appState.current = nextAppState;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [
    authInactivityOnly,
    isAuthenticated,
    isSensitiveDataVisible,
    cameFromInactive,
  ]);

  return children;
};
