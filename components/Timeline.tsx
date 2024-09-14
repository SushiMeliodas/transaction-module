import { useState, Fragment } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { HistoryItem, MergedHistoryByDate } from "@/types/data.type";

import { history } from "@/constant";

import { mergeHistoryByDate, formatAmount } from "@/utils";

import Card from "./common/Card";
import { router } from "expo-router";

// Types
interface TimelineProps {
  className?: string;
}

interface TimelineBranchProps {
  timeline: MergedHistoryByDate;
}

// Internal Component
const TimelineBranch = (props: TimelineBranchProps) => {
  const { timeline } = props;

  const onOpenDetailPress = () => {
    router.push("/(root)/history-detail");
  };

  const transactionColor = (itemType: HistoryItem["type"]) => {
    return itemType === "credit" ? "bg-green-500" : "bg-red-500";
  };

  // TODO: enhance the border while there's 2 items

  return (
    <>
      <Text>{timeline.date}</Text>
      {timeline.items?.map((item, index) => (
        <View key={index} className="w-full flex flex-row items-center">
          <View className="w-2/5">
            {item.type === "credit" && (
              <TouchableOpacity onPress={onOpenDetailPress}>
                <>
                  <Text className="text-right">
                    {formatAmount(item.amount, item.type)}
                  </Text>
                  <Text className="text-right">{item.description}</Text>
                </>
              </TouchableOpacity>
            )}
          </View>
          <View className="flex items-center w-1/5 ">
            <View
              className={`border-l border-gray-300 mx-4 ${
                index === 0 || timeline.items.length === index + 1
                  ? "h-16"
                  : "flex-grow"
              }`}
            />
            <View
              className={`w-4 h-4 ${transactionColor(
                item.type
              )} rounded-full border-2 border-white`}
            />
            <View
              className={`border-l border-gray-300 mx-4 ${
                index === 0 || timeline.items.length === index + 1
                  ? "h-16"
                  : "flex-grow"
              }`}
            />
          </View>
          <View className="w-2/5">
            {item.type === "debit" && (
              <TouchableOpacity onPress={onOpenDetailPress}>
                <>
                  <Text>{formatAmount(item.amount, item.type)}</Text>
                  <Text>{item.description}</Text>
                </>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </>
  );
};

// Main Component
const Timeline = (props: TimelineProps) => {
  const { className } = props;

  const timelineData = mergeHistoryByDate(history);

  // console.log(timelineData);

  return (
    <Card cardClassName={{ card: className }}>
      <View className="flex items-center">
        {timelineData.map((timeline, index) => (
          <Fragment key={timeline.date}>
            <TimelineBranch timeline={timeline} />
          </Fragment>
        ))}
      </View>
    </Card>
  );
};

export default Timeline;
