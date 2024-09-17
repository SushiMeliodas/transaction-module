import { useMemo, useRef, useCallback, useEffect } from "react";
import { View, Text } from "react-native";

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import ActionButton from "./common/ActionButton";

interface ModalBottomSheetProps {
  title: string;
  message: string;
  content?: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  className?: string;
  hideClose?: boolean;
}

const ModalBottomSheet = (props: ModalBottomSheetProps) => {
  const { title, message, content, open, onClose, onSubmit, hideClose } = props;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["35%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7}
        pressBehavior="none"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  useEffect(() => {
    if (!open) {
      bottomSheetModalRef.current?.close();
    } else {
      bottomSheetModalRef.current?.present();
    }
  }, [open]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      handleComponent={null}
      enablePanDownToClose={false}
      onDismiss={onClose}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView className="flex-1 items-center">
        <View className="h-full p-6 bg-zinc-800 w-full">
          <Text className="text-3xl font-bold mb-3 text-white">{title}</Text>
          {content ? (
            <View>{content}</View>
          ) : (
            <Text className="text-white mb-5 text-xl">{message}</Text>
          )}
          <View className="flex-row justify-between mt-auto mb-4">
            <ActionButton
              onPress={onSubmit}
              bgVariant="white"
              textVariant="primary"
              title="Yes"
              className={hideClose ? "" : "w-5/12"}
            />
            {!hideClose && (
              <ActionButton
                onPress={onClose}
                bgVariant="white"
                textVariant="primary"
                title="Close"
                className="w-5/12"
              />
            )}
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ModalBottomSheet;
