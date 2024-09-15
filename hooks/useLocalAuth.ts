import * as LocalAuthentication from "expo-local-authentication";

export const useLocalAuth = () => {
  const authenticate = async () => {
    try {
      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to continue",
        fallbackLabel: "Use Passcode",
      });

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
