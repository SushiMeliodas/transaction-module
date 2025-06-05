import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";

import { formatAmount } from "@/utils/number";

import { Card } from "@/components/common/Card";

interface ActionButtonProps {
  actionDetails: {
    title: string;
    icon: React.ReactNode;
    onPress: () => void;
  };
}

const ActionButton = (props: ActionButtonProps) => {
  const { actionDetails } = props;

  return (
    <Pressable
      className="p-2.5 items-center gap-2 "
      onPress={actionDetails.onPress}
    >
      {actionDetails.icon}
      <Text className="">{actionDetails.title}</Text>
    </Pressable>
  );
};

const AccountPanel = () => {
  const ActionList = [
    {
      title: "Transfer",
      icon: <Feather name="send" size={20} color="black" />,
      onPress: () => console.log("Transfer Pressed"),
    },
    {
      title: "Top Up",
      icon: <Feather name="plus" size={20} color="black" />,
      onPress: () => console.log("Receive Money Pressed"),
    },
    {
      title: "Pay Bills",
      icon: <Feather name="file-text" size={20} color="black" />,
      onPress: () => console.log("Transactions Pressed"),
    },
    {
      title: "Rewards",
      icon: <Feather name="gift" size={20} color="black" />,
      onPress: () => console.log("Rewards Pressed"),
    },
  ];

  return (
    <View className="relative mb-16">
      <Card className="relative items-center gap-2 p-4 pb-14">
        <Text className="text-textMuted text-lg">My Balance:</Text>
        <Text className="text-textMain text-4xl">{formatAmount(246293)}</Text>
      </Card>

      <View className="absolute left-1/2 -translate-x-1/2 top-28 bg-background flex-row gap-4 mx-auto border border-neutral-300 rounded-2xl p-2.5">
        {ActionList.map((actionItem, index) => (
          <ActionButton key={index} actionDetails={actionItem} />
        ))}
      </View>
    </View>
  );
};

export default AccountPanel;
