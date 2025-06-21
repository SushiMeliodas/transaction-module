import { Text, AppState, View } from "react-native";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "expo-router";

import moment, { Moment } from "moment";

import { useAppSelector, useAppDispatch } from "@/hooks/useReduxHooks";
import useActivityTracker from "@/hooks/useActivityTracker";
import useAuthorization from "@/hooks/useAuthorization";
import useInterval from "@/hooks/useInternal";

import { authSliceActions } from "@/redux/slices/authSlice";

import { formatTime } from "@/utils/datetime";

import BottomDrawer from "@/components/BottomDrawer";

const EXPIRED_TIME = 900000000;
// const EXPIRED_TIME = 30;
const REMINDER_TIME = 25;
const BACKGROUND_TIMER = 10;

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
  const currentBgTimeRef = useRef<Moment | null>(null);

  // Modal state
  const [isActiveDrawerShow, setIsActiveDrawerShow] = useState<boolean>(false);
  const [isLoggedOffDrawerShow, setIsLoggedOffDrawerShow] =
    useState<boolean>(false);

  // Moment
  const currentDate = moment();
  const currentDateTime = currentDate.format("DD MMM YYYY, HH:mm");

  const isBackgroundTimeExpired = (initialDate: moment.Moment) => {
    const returnDate = moment(); // Get return date again
    const diffInSeconds = returnDate.diff(initialDate, "seconds"); // Get difference in seconds
    return diffInSeconds >= BACKGROUND_TIMER;
  };

  // User activity counter
  const sessionExpired = () => {
    logout();

    stopActiveTimer();
    resetActiveTimer();

    if (isActiveDrawerShow) {
      setIsActiveDrawerShow(false);
    }

    if (!isLoggedOffDrawerShow) {
      setIsLoggedOffDrawerShow(true);
    }
  };

  const resetSessionTimer = () => {
    // stopActiveTimer();
    resetActiveTimer();

    if (isActiveDrawerShow) {
      setIsActiveDrawerShow(false);
    }

    dispatch(authSliceActions.setAuthActive(true)); // Ensure the timer starts again
  };

  const resetActiveTimer = () => {
    activeTimeRef.current = EXPIRED_TIME;
    setRemainingTime(EXPIRED_TIME);
  };

  const onActiveStart = () => {
    activeTimeRef.current -= 1;

    const secondsRemaining = activeTimeRef.current;

    if (activeTimeRef.current === REMINDER_TIME) {
      setIsActiveDrawerShow(true);
    }

    if (activeTimeRef.current <= REMINDER_TIME) {
      setRemainingTime(secondsRemaining);
    }

    if (activeTimeRef.current === 0) {
      sessionExpired();
    }
  };

  const {
    start: startActiveTimer,
    pause: pauseActiveTimer,
    resume: resumeActiveTimer,
    stop: stopActiveTimer,
    isPaused: isActivePaused,
  } = useInterval({ onTick: onActiveStart });

  const handleAppStateChange = (nextAppState: any) => {
    // console.log("appState", appState.current, nextAppState);
    // console.log(authInactivityOnly, isAuthenticated);

    if (isAuthenticated) {
      const isInactiveOrBackground =
        nextAppState === "inactive" || nextAppState === "background";

      if (isInactiveOrBackground && !authInactivityOnly) {
        // Set background current date time
        currentBgTimeRef.current = currentDate;

        // stopActiveTimer();
        // pauseActiveTimer();
        setCameFromInactive(true);

        if (isActiveDrawerShow) {
          setIsActiveDrawerShow(false);
          pauseActiveTimer();
          resetActiveTimer();
        } else {
          pauseActiveTimer();
        }

        router.push("/(modal)/inactive");
      } else {
        if (authInactivityOnly) {
          pauseActiveTimer();
        } else {
          resumeActiveTimer();

          if (cameFromInactive) {
            if (isBackgroundTimeExpired(currentBgTimeRef.current!)) {
              sessionExpired();
            } else {
              // Return to previous screen
              if (router.canGoBack()) router.back();
            }

            // Reset back from inactive/background
            setCameFromInactive(false);
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
    activeTimeRef.current,
    isActivePaused,
  ]);

  useEffect(() => {
    if (isAuthenticated && isActive && activeTimeRef.current > 0) {
      startActiveTimer();
    } else {
      stopActiveTimer();
    }

    // return () => {
    //   stopActiveTimer();
    // };
  }, [
    isActive,
    isAuthenticated,
    activeTimeRef.current,
    // isActivePaused,
    // isActiveRunning,
    startActiveTimer,
    stopActiveTimer,
  ]);

  useEffect(() => {
    if (authInactivityOnly && isActiveDrawerShow) {
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
    // For network error redirect
    if (isRedirectLogin) {
      sessionExpired();
    }
  }, [isRedirectLogin]);

  // console.log(
  //   remainingTime,
  //   activeTimeRef.current,
  //   `isActivePaused: ${isActivePaused}`,
  //   `isAuthenticated: ${isAuthenticated}`,
  //   `authActivity: ${authInactivityOnly}`,
  //   `isActive: ${isActive}`,
  //   `isActiveDrawerShow: ${isActiveDrawerShow}`,
  //   `isLoggedOffDrawerShow: ${isLoggedOffDrawerShow}`
  // );

  return (
    <>
      {children}
      {/* Reminder drawer */}
      <BottomDrawer open={isActiveDrawerShow}>
        <BottomDrawer.Title>Are you still there?</BottomDrawer.Title>
        <View className="flex-1 p-3 gap-4">
          <Text className="text-white font-bold text-2xl">
            {formatTime(remainingTime)}
          </Text>
          <Text className="text-white text-xl">
            You will be logged out due to inactivity.
          </Text>
        </View>
        <BottomDrawer.ActionButton
          onPress={resetSessionTimer}
          variant="secondary"
          className="mb-14"
        >
          <Text className="text-primary text-xl text-center">
            Yep, still here!
          </Text>
        </BottomDrawer.ActionButton>
      </BottomDrawer>

      {/* Timeout drawer */}
      <BottomDrawer open={isLoggedOffDrawerShow}>
        <BottomDrawer.CloseButton
          onClose={() => setIsLoggedOffDrawerShow(false)}
        />
        <BottomDrawer.Title>Session Timeout</BottomDrawer.Title>
        <View className="flex-1 p-3 gap-4">
          <Text className="text-white font-bold text-xl">
            You’ve been logged out due to inactivity or a network error. Please
            log in again to continue.
          </Text>
          <Text className="text-white text-xl">{currentDateTime}</Text>
        </View>
      </BottomDrawer>
    </>
  );
};
