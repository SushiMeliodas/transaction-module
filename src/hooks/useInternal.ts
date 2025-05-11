import { useEffect, useState, useRef, useCallback } from "react";

interface UseIntervalOptions {
  onTick?: () => void;
  onStart?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
}

const useInterval = (
  { onTick, onStart, onPause, onResume, onStop }: UseIntervalOptions,
  initialDelay = 1000
) => {
  const [delay, setDelay] = useState<number | null>(initialDelay);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const savedCallback = useRef<() => void>();
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = onTick;
  }, [onTick]);

  // Set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay !== null && isRunning && !isPaused) {
      intervalId.current = setInterval(tick, delay);
      return () => {
        if (intervalId.current) clearInterval(intervalId.current);
      };
    }
  }, [delay, isRunning, isPaused]);

  const start = useCallback(() => {
    if (!isRunning && !isPaused) {
      setIsRunning(true);
      onStart?.();
      console.log("interval: start");
    }
  }, [isRunning, isPaused, onStart]);

  const pause = useCallback(() => {
    console.log(isRunning, isPaused, "HALO");
    if (isRunning && !isPaused) {
      setIsPaused(true);
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
      onPause?.();
      console.log("interval: pause");
    }
  }, [isRunning, isPaused, onPause]);

  const resume = useCallback(() => {
    if (isRunning && isPaused) {
      setIsPaused(false);
      onResume?.();
      console.log("interval: resume");
    }
  }, [isRunning, isPaused, onResume]);

  const stop = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      setIsPaused(false);
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
      onStop?.();
      console.log("interval: stop");
    }
  }, [isRunning, onStop]);

  const changeDelay = useCallback((newDelay: number | null) => {
    setDelay(newDelay);
  }, []);

  return {
    start,
    pause,
    resume,
    stop,
    changeDelay,
    isRunning,
    isPaused,
  };
};

export default useInterval;
