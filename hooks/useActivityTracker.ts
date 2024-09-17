import { useRef } from "react";
import { PanResponder } from "react-native";

import { useAppDispatch } from "./useReduxHooks";

import { authSliceActions } from "@/redux/slices/authSlice";

const useActivityTracker = () => {
  const dispatch = useAppDispatch();

  const reActiveIdle = () => {
    dispatch(authSliceActions.setReactiveIdle(true));
  };

  const resetReactiveIdle = () => {
    dispatch(authSliceActions.setReactiveIdle(false));
  };

  const userActivity = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log("User interaction detected");
      },
      // onPanResponderMove: () => {
      //   console.log("User move detected");
      // },
      onPanResponderRelease: () => {
        console.log("Touch released");
      },
      onPanResponderTerminate: () => {
        console.log("Touch Cancel");
      },
    })
  ).current;

  return { reActiveIdle, resetReactiveIdle, userActivity };
};

export default useActivityTracker;
