import { useMemo, useRef, useCallback, useEffect } from "react";
import { View, Text, Pressable } from "react-native";

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { ModalBottomSheetProps } from "@/types/component.type";

import ActionButton from "./common/ActionButton";

const ModalBottomSheet = (props: ModalBottomSheetProps) => {
  const {
    title,
    message,
    content,
    open,
    onClose,
    onSubmit,
    showCloseIcon = false,
    hideAction = false,
    actionProps = [
      { label: "Yes", callback: onSubmit },
      { label: "No", callback: onClose },
    ],
    modalHeight = 40,
  } = props;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [`${modalHeight}%`], [modalHeight]);

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
      bottomSheetModalRef.current?.dismiss();
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
        <View className="h-full bg-zinc-800 w-full">
          {showCloseIcon && (
            <Pressable
              onPress={onClose}
              className="flex w-full items-end px-2 pt-2 pb-1"
            >
              <MaterialIcons
                name="close"
                size={28}
                color="white"
                style={{
                  margin: 6,
                }}
              />
            </Pressable>
          )}
          <View className={showCloseIcon ? "px-5 pb-3 pt-2" : "p-5"}>
            <Text className="text-3xl font-bold mb-4 text-white">{title}</Text>
            {content ? (
              <View>{content}</View>
            ) : (
              <Text className="text-white mb-5 text-xl h-fit">{message}</Text>
            )}
          </View>
          <View className="flex justify-between mt-auto mb-6 px-5 py-3">
            {!hideAction &&
              actionProps.map((actionProp, index) => {
                if (index > actionProps.length) return;

                return (
                  <ActionButton
                    key={actionProp.label}
                    onPress={actionProp.callback}
                    bgVariant="white"
                    textVariant="primary"
                    title={actionProp.label}
                    className={actionProps.length === index + 1 ? "" : "mb-4"}
                  />
                );
              })}
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default ModalBottomSheet;
