import Toast, { ToastShowParams } from "react-native-toast-message";

// Custom Style refer https://github.com/calintamas/react-native-toast-message/blob/main/docs/custom-layouts.md
const useToast = () => {
  const toastOptions = (options?: ToastShowParams) => ({
    position: "top" as "top",
    visibilityTime: 4000,
    text1Style: { fontSize: 16, fontWeight: "600" as "600" },
    text2Style: { fontSize: 14, color: "#979797" },
    ...options,
  });

  // Success
  const successToast = (
    title: string,
    message: string,
    options?: ToastShowParams
  ) =>
    Toast.show({
      text1: title,
      text2: message,
      type: "success",
      ...toastOptions(options),
    });

  // Error
  const errorToast = (
    title: string,
    message: string,
    options?: ToastShowParams
  ) =>
    Toast.show({
      text1: title,
      text2: message,
      type: "error",
      ...toastOptions(options),
    });

  // Info
  const infoToast = (
    title: string,
    message: string,
    options?: ToastShowParams
  ) =>
    Toast.show({
      text1: title,
      text2: message,
      type: "info",
      ...toastOptions(options),
    });

  // Hide
  const hideToast = () => {
    Toast.hide();
  };

  return { successToast, errorToast, infoToast, hideToast };
};

export default useToast;
