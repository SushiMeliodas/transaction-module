import { useEffect, useRef, useCallback } from "react";

interface UseIntervalOptions {
  onStart?: () => void; // Callback when the interval starts
  onPause?: () => void; // Callback when the interval pauses
  onResume?: () => void; // Callback when the interval resumes
  onStop?: () => void; // Callback when the interval stops
}

const useInterval = (
  { onStart, onPause, onResume, onStop }: UseIntervalOptions,
  initialDelay = 1000
) => {
  const savedStartCallback = useRef(onStart);
  const savedPauseCallback = useRef(onPause);
  const savedResumeCallback = useRef(onResume);
  const savedStopCallback = useRef(onStop);

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const isRunning = useRef(false);
  const isPaused = useRef<boolean>(false);

  // Store the latest callbacks
  useEffect(() => {
    savedStartCallback.current = onStart;
    savedPauseCallback.current = onPause;
    savedResumeCallback.current = onResume;
    savedStopCallback.current = onStop;
  }, [onStart, onPause, onResume, onStop]);

  // Start the interval
  const start = useCallback(() => {
    if (isPaused.current) return;

    if (!isRunning.current) {
      // console.log("start");
      intervalId.current = setInterval(() => {
        savedStartCallback.current?.();
      }, initialDelay);
      isRunning.current = true;
    }
  }, [initialDelay]);

  // Pause the interval
  const pause = useCallback(() => {
    if (intervalId.current) {
      // console.log("pause");
      clearInterval(intervalId.current);
      savedPauseCallback.current?.();
      isRunning.current = false;
      isPaused.current = true;
    }
  }, []);

  // Resume the interval
  const resume = useCallback(() => {
    if (!isRunning.current) {
      // console.log("resume");
      intervalId.current = setInterval(() => {
        savedResumeCallback.current?.();
      }, initialDelay);
      isRunning.current = true;
      isPaused.current = false;
    }
  }, [initialDelay]);

  // Stop the interval completely
  const stop = useCallback(() => {
    if (intervalId.current) {
      // console.log("stop");
      clearInterval(intervalId.current);
      intervalId.current = null;
      savedStopCallback.current?.();
      isRunning.current = false;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return stop; // Cleanup by stopping the interval
  }, [stop]);

  return {
    start,
    pause,
    resume,
    stop,
    isRunning: isRunning.current,
    isPaused: isPaused.current,
  };
};

export default useInterval;
