import { Text, AppState } from "react-native";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "expo-router";

import moment from "moment";

import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import useActivityTracker from "@/hooks/useActivityTracker";
import useAuthorization from "@/hooks/useAuthorization";
import useInterval from "@/hooks/useInternal";

import { authSliceActions } from "@/redux/slices/authSlice";

import { formatTime } from "@/utils/datetime";

import ModalBottomSheet from "@/components/ModalBottomSheet";

// const EXPIRED_TIME = 900 * 1000;
const EXPIRED_TIME = 30 * 1000;
const REMINDER_TIME = 25 * 1000;
const BACKGROUND_TIMER = 10 * 1000;

export const AuthGuard = ({ children }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { resetReactiveIdle } = useActivityTracker();
  const { logout } = useAuthorization();

  const authState = useAppSelector((state) => state.auth);
  const {
    isAuthenticated,
    authInactivityOnly,
    isActive,
    isReactiveIdle,
    isRedirectLogin,
  } = authState;

  // User activity state
  const appState = useRef(AppState.currentState);
  const [cameFromInactive, setCameFromInactive] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(EXPIRED_TIME);
  const activeTimeRef = useRef<number>(EXPIRED_TIME);

  // Background activity state
  const isReturnLogin = useRef<boolean>(false);
  const startTime = Date.now();

  // Modal state
  const [showActiveCheckModal, setShowActiveCheckModal] =
    useState<boolean>(false);
  const [showLoggedOffModal, setShowLoggedOffModal] = useState<boolean>(false);

  // Moment
  const currentDate = moment();
  const currentDateTime = currentDate.format("DD MMM YYYY, HH:mm");

  // User activity counter
  const sessionExpired = () => {
    stopActiveTimer();
    resetActiveTimer();

    if (showActiveCheckModal) {
      setShowActiveCheckModal(false);
    }

    if (!showLoggedOffModal) {
      setShowLoggedOffModal(true);
    }

    logout();
  };

  const resetSessionTimer = () => {
    stopActiveTimer();
    resetActiveTimer();

    if (showActiveCheckModal) {
      setShowActiveCheckModal(false);
    }

    dispatch(authSliceActions.setAuthActive(true)); // Ensure the timer starts again
  };

  const resetActiveTimer = () => {
    activeTimeRef.current = EXPIRED_TIME;
    setRemainingTime(EXPIRED_TIME);
  };

  const onActiveStart = () => {
    activeTimeRef.current -= 1000;

    const secondsRemaining = Math.ceil(activeTimeRef.current / 1000);

    if (activeTimeRef.current === REMINDER_TIME) {
      setShowActiveCheckModal(true);
    }

    if (activeTimeRef.current <= REMINDER_TIME) {
      setRemainingTime(secondsRemaining);
    }

    if (activeTimeRef.current === 0) {
      sessionExpired();
    }
  };

  const onActiveResume = () => {
    // Rerun the start function
    onActiveStart();
  };

  const {
    start: startActiveTimer,
    pause: pauseActiveTimer,
    resume: resumeActiveTimer,
    stop: stopActiveTimer,
    // isRunning: isActiveRunning,
    isPaused: isActivePaused,
  } = useInterval({ onStart: onActiveStart, onResume: onActiveResume });

  const onBackgroundStart = () => {
    const elapsedTime = Date.now() - startTime;
    const backgroundTime = Math.max(
      0,
      Math.ceil((BACKGROUND_TIMER - elapsedTime) / 1000)
    ); // Convert to seconds

    if (backgroundTime <= 0) {
      isReturnLogin.current = true;
      stopBackgroundTimer();
    }
  };

  const {
    start: startBackgroundTimer,
    // pause: pauseBackgroundTimer,
    // resume: resumeBackgroundTimer,
    stop: stopBackgroundTimer,
  } = useInterval({ onStart: onBackgroundStart });

  const handleAppStateChange = (nextAppState: any) => {
    // console.log("appState", appState.current, nextAppState);
    // console.log(authInactivityOnly, isAuthenticated);

    if (isAuthenticated) {
      const isInactiveOrBackground =
        nextAppState === "inactive" || nextAppState === "background";

      if (isInactiveOrBackground && !authInactivityOnly) {
        if (showActiveCheckModal) {
          setShowActiveCheckModal(false);
        }
        // stopActiveTimer();
        pauseActiveTimer();
        startBackgroundTimer();
        setCameFromInactive(true);
        router.push("/(modal)/inactive");
      } else {
        if (!authInactivityOnly) {
          resumeActiveTimer();

          if (cameFromInactive) {
            if (isReturnLogin.current) {
              sessionExpired();
              isReturnLogin.current = false;
            } else {
              stopBackgroundTimer();

              // Return to previous screen
              if (router.canGoBack()) {
                router.back();
              }
            }

            // Reset back from inactive/background
            setCameFromInactive(false);
          }
        }

        if (authInactivityOnly) {
          // stopActiveTimer();
          pauseActiveTimer();
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
    activeTimeRef.current,
    isActivePaused,
  ]);

  useEffect(() => {
    if (isAuthenticated && isActive && activeTimeRef.current > 0) {
      startActiveTimer();
    }

    return () => {
      stopActiveTimer();
    };
  }, [
    isActive,
    isAuthenticated,
    activeTimeRef.current,
    // isActiveRunning,
    // startActiveTimer,
    // stopActiveTimer,
  ]);

  useEffect(() => {
    if (authInactivityOnly && showActiveCheckModal) {
      resetSessionTimer();
    }
  }, [authInactivityOnly]);

  useEffect(() => {
    if (isReactiveIdle) {
      resetSessionTimer();
      resetReactiveIdle();
    }
  }, [isReactiveIdle]);

  useEffect(() => {
    if (isRedirectLogin) {
      sessionExpired();
    }
  }, [isRedirectLogin]);

  console.log(
    remainingTime,
    activeTimeRef.current,
    `isActivePaused: ${isActivePaused}`,
    `isAuthenticated: ${isAuthenticated}`,
    `authActivity: ${authInactivityOnly}`,
    `isActive: ${isActive}`,
    `showActiveCheckModal: ${showActiveCheckModal}`,
    `showLoggedOffModal: ${showLoggedOffModal}`
  );

  return (
    <>
      {children}
      <ModalBottomSheet
        open={showActiveCheckModal}
        title="Are you still there?"
        content={
          <>
            <Text className="text-white font-bold text-2xl">
              {formatTime(remainingTime)}
            </Text>
            <Text className="text-white mb-5 text-xl">
              You will be logged out due to inactivity.
            </Text>
          </>
        }
        actionProps={[
          { label: "Yep, still here!", callback: resetSessionTimer },
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
