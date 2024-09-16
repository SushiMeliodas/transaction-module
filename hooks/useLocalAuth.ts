import { authenticateAsync } from "expo-local-authentication";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";

import { authSliceActions } from "@/redux/slices/authSlice";

export const useLocalAuth = () => {
  const dispatch = useAppDispatch();

  const authenticate = async () => {
    // dispatch(authSliceActions.setisAuthenticating(true));
    dispatch(authSliceActions.setAuthActivity(true));

    try {
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
