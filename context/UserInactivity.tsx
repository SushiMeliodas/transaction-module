import { Text } from "react-native";
import { useRef, useEffect, useState } from "react";
import { AppState } from "react-native";
import { useRouter } from "expo-router";

import moment from "moment";

import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import useActivityTracker from "@/hooks/useActivityTracker";
import useAuthorization from "@/hooks/useAuthorization";

import { authSliceActions } from "@/redux/slices/authSlice";

import { formatTime } from "@/utils/datetime";

import ModalBottomSheet from "@/components/ModalBottomSheet";

// const EXPIRED_TIME = 900 * 1000;
const EXPIRED_TIME = 30 * 1000;
const REMINDER_TIME = 25 * 1000;
const BACKGROUND_TIMER = 10 * 1000;

export const UserInactivityProvider = ({ children }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const { resetReactiveIdle } = useActivityTracker();
  const { logout } = useAuthorization();

  const {
    isAuthenticated,
    authInactivityOnly,
    isActive,
    isReactiveIdle,
    isRedirectLogin,
  } = authState;

  const appState = useRef(AppState.currentState);

  const [cameFromInactive, setCameFromInactive] = useState<boolean>(false);
  const [showActiveCheckModal, setShowActiveCheckModal] =
    useState<boolean>(false);
  const [showLoggedOffModal, setShowLoggedOffModal] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(EXPIRED_TIME);

  const timerRef = useRef<number>(EXPIRED_TIME);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isPaused = useRef<boolean>(false);

  const backgroundTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isReturnLogin = useRef<boolean>(false);

  const currentDateTime = moment().format("DD MMM YYYY, HH:mm");

  // Usecase: User idle expired pause timer/reset state and redirect to login
  const handleExpired = () => {
    clearInterval(intervalRef.current!);
    resetTime();

    if (showActiveCheckModal) setShowActiveCheckModal(false); // Close active check modal
    if (!showLoggedOffModal) setShowLoggedOffModal(true);

    logout();
  };

  const handleResetExpired = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    resetTime();

    if (showActiveCheckModal) setShowActiveCheckModal(false); // Close active check modal

    dispatch(authSliceActions.setAuthActive(true)); // Ensure the timer starts again
  };

  const resetTime = () => {
    timerRef.current = EXPIRED_TIME; // Reset the timerRef to the original duration
    setSecondsLeft(EXPIRED_TIME); // Update the state to reflect the reset value
  };

  const startTimer = () => {
    if (isPaused.current) return;

    intervalRef.current = setInterval(() => {
      timerRef.current -= 1000;

      const secondsRemaining = Math.ceil(timerRef.current / 1000);

      if (timerRef.current === REMINDER_TIME) {
        setShowActiveCheckModal(true);
      }

      if (timerRef.current <= REMINDER_TIME) {
        setSecondsLeft(secondsRemaining);
      }

      if (timerRef.current === 0) {
        handleExpired();
      }
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      isPaused.current = true; // Mark as paused
    }
  };

  // const stopTimer = () => {
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //     intervalRef.current = null; // Optionally set the ref to null
  //   }
  // };

  const resumeTimer = () => {
    if (isPaused.current) {
      isPaused.current = false;

      startTimer();
    }
  };

  const startBackgroundTimer = () => {
    const startTime = Date.now();

    backgroundTimerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(
        0,
        (BACKGROUND_TIMER - elapsedTime) / 1000
      ); // Convert to seconds

      if (remainingTime <= 0) {
        isReturnLogin.current = true;
        clearBackgroundTimer();
      }
    }, 1000); // Check every second
  };

  const clearBackgroundTimer = () => {
    if (backgroundTimerRef.current) {
      clearInterval(backgroundTimerRef.current);
      backgroundTimerRef.current = null;
    }
  };

  const handleAppStateChange = (nextAppState: any) => {
    // console.log("appState", appState.current, nextAppState);
    // console.log(authInactivityOnly, isAuthenticated);

    if (isAuthenticated) {
      if (
        (nextAppState === "inactive" || nextAppState === "background") &&
        !authInactivityOnly
      ) {
        pauseTimer();

        startBackgroundTimer();
        // if (isAuthenticated) {
        //   startBackgroundTimer();
        // }

        setCameFromInactive(true);
        router.push("/(modal)/inactive");
      } else {
        if (authInactivityOnly) {
          pauseTimer();
          // if (isAuthenticated) {
          //   pauseTimer();
          // }

          // dispatch(authSliceActions.setAuthActivity(false));
        } else {
          resumeTimer();

          if (cameFromInactive) {
            setCameFromInactive(false);
            if (isReturnLogin.current) {
              handleExpired();
              isReturnLogin.current = false;
            } else {
              clearBackgroundTimer();

              if (router.canGoBack()) {
                router.back();
              }
            }
          }
        }
      }
    }
    appState.current = nextAppState;
  };

  // Handle active & inactive
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
    cameFromInactive,
    timerRef.current,
    isPaused.current,
  ]);

  // Handle activity timer
  useEffect(() => {
    if (isAuthenticated && isActive && timerRef.current > 0) {
      startTimer();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    isActive,
    isAuthenticated,
    intervalRef.current,
    timerRef.current,
    isPaused.current,
  ]);

  // Usecase: handle if auth is happening and active check show
  useEffect(() => {
    if (authInactivityOnly && showActiveCheckModal) {
      handleResetExpired();
    }
  }, [authInactivityOnly]);

  // Usecase: reactive user idle when user perform action
  useEffect(() => {
    if (isReactiveIdle) {
      handleResetExpired();

      resetReactiveIdle();
    }
  }, [isReactiveIdle]);

  // Usecase: network error redirect to login
  useEffect(() => {
    if (isRedirectLogin) {
      handleExpired();

      // dispatch(authSliceActions.redirectLogin(false));
    }
  }, [isRedirectLogin]);

  // console.log(
  //   secondsLeft,
  //   timerRef.current,
  //   intervalRef.current,
  //   `isPaused: ${isPaused.current}`,
  //   `isAuthenticated: ${isAuthenticated}`,
  //   `authActivity: ${authInactivityOnly}`,
  //   `isActive: ${isActive}`,
  //   `showActiveCheckModal: ${showActiveCheckModal}`,
  //   `showLoggedOffModal: ${showLoggedOffModal}`
  // );

  return (
    <>
      {children}
      <ModalBottomSheet
        open={showActiveCheckModal}
        title="Are you still there?"
        content={
          <>
            <Text className="text-white font-bold text-2xl">
              {formatTime(secondsLeft)}
            </Text>
            <Text className="text-white mb-5 text-xl">
              You will be logged out due to inactivity.
            </Text>
          </>
        }
        actionProps={[
          { label: "Yep, still here!", callback: handleResetExpired },
        ]}
      />
      <ModalBottomSheet
        open={showLoggedOffModal}
        onClose={() => setShowLoggedOffModal(false)}
        title="Session Timeout"
        content={
          <>
            <Text className="text-white mb-5 text-xl">
              You’ve been logged out due to inactivity or a network error.
              Please log in again to continue.
            </Text>
            <Text className="text-white font-bold text-xl">
              {currentDateTime}
            </Text>
          </>
        }
        hideAction
        showCloseIcon
      />
    </>
  );
};
