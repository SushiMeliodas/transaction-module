import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import Button from "./common/Button";

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

interface BottomDrawerProps {
  open: boolean;
  onClose?: () => void;
  modalHeight?: number; // percentage of screen height
  className?: string;
  children?: React.ReactNode;
}

interface TitleProps {
  className?: string;
  children: React.ReactNode;
}

interface CloseButtonProps {
  onClose: () => void;
}

interface ActionButtonProps {
  onPress: () => void;
  className?: string;
  children?: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "outline"
    | "white";
  [key: string]: any; // Allow additional props
}

// components
const Title = (props: TitleProps) => {
  const { className, children } = props;

  return (
    <Text className={`text-3xl font-bold mb-4 text-white ${className}`}>
      {children}
    </Text>
  );
};

const CloseButton = (props: CloseButtonProps) => {
  const { onClose } = props;

  return (
    <Pressable onPress={onClose} className="flex w-full items-end  pb-1">
      <Feather name="x" size={28} color="white" />
    </Pressable>
  );
};

const ActionButton = (props: ActionButtonProps) => {
  const { onPress, className, children, variant = "primary", ...rest } = props;

  return (
    <Button className={className} variant={variant} onPress={onPress}>
      {children}
    </Button>
  );
};

const BottomDrawer = (props: BottomDrawerProps) => {
  const { open, onClose, modalHeight = 40, children, className } = props;

  // ref
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

  // callbacks
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log("handleSheetChanges", index);
  // }, []);

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
      // onChange={handleSheetChanges}
      onDismiss={onClose}
      handleComponent={null}
      enablePanDownToClose={false}
      enableOverDrag={false}
      backdropComponent={renderBackdrop}
      backgroundStyle={{
        backgroundColor: "#2A2A2E", // TODO: Change to theme color
      }}
    >
      <BottomSheetView className="flex-1 py-7 px-6">{children}</BottomSheetView>
    </BottomSheetModal>
  );
};

BottomDrawer.Title = Title;
BottomDrawer.CloseButton = CloseButton;
BottomDrawer.ActionButton = ActionButton;

export default BottomDrawer;
