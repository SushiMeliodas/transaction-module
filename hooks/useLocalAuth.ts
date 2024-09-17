import {
  authenticateAsync,
  hasHardwareAsync,
  supportedAuthenticationTypesAsync,
  isEnrolledAsync,
} from "expo-local-authentication";

import { useAppDispatch } from "./useReduxHooks";
import useToast from "./useToast";

import { authSliceActions } from "@/redux/slices/authSlice";

const useLocalAuth = () => {
  const dispatch = useAppDispatch();
  const { errorToast } = useToast();

  const errorTitle = "Auth Error";

  const authenticate = async () => {
    // dispatch(authSliceActions.setisAuthenticating(true));
    try {
      dispatch(authSliceActions.setAuthActivity(true));

      // checks if biometric hardware is present
      const checkHardwareAvailability = async () => {
        try {
          const hardwareAvailable = await hasHardwareAsync();
          return hardwareAvailable;
        } catch (error) {
          console.error("Error checking hardware availability:", error);
          return false;
        }
      };

      // checks if at least one biometric credential is enrolled
      const checkEnrollment = async () => {
        try {
          const enrolled = await isEnrolledAsync();
          return enrolled;
        } catch (error) {
          console.error("Error checking biometric enrollment:", error);
          return false;
        }
      };

      // checks which types of biometrics are supported
      const checkBiometricType = async () => {
        try {
          const supportedTypes = await supportedAuthenticationTypesAsync();
          return supportedTypes;
        } catch (error) {
          console.error("Error checking biometric type:", error);
          return [];
        }
      };

      const checkBiometricSetup = async () => {
        const hardwareAvailable = await checkHardwareAvailability();
        if (!hardwareAvailable) {
          errorToast(errorTitle, "Biometric hardware is not available.");
          return false;
        }

        const enrolled = await checkEnrollment();
        if (!enrolled) {
          errorToast(errorTitle, "No biometrics enrolled.");
          return false;
        }

        const supportedTypes = await checkBiometricType();
        if (supportedTypes.length === 0) {
          errorToast(errorTitle, "No supported biometric types.");
          return false;
        }

        return true;
      };

      // check all bio auth at once
      const isBiometricReady = await checkBiometricSetup();

      if (!isBiometricReady) return { success: false };

      const authResult = await authenticateAsync({
        promptMessage: "Authenticate to continue",
        fallbackLabel: "Use Passcode",
      });

      // dispatch(authSliceActions.setisAuthenticating(false));
      return authResult;
    } catch (error) {
      // Handle errors
      return { success: false, error: (error as Error).message };
    }
  };

  return {
    authenticate,
  };
};
export default useLocalAuth;
