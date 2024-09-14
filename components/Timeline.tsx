import { useState, Fragment } from "react";
import { View, Text, ScrollView } from "react-native";

import { HistoryItem, MergedHistoryByDate } from "@/types/data.type";

import { history } from "@/constant";

import { mergeHistoryByDate } from "@/utils";

import Card from "./common/Card";

interface TimelineProps {
  className?: string;
}

interface TimelineBranchProps {
  timeline: MergedHistoryByDate;
}

const TimelineBranch = (props: TimelineBranchProps) => {
  const { timeline } = props;

  return (
    <>
      <Text>{timeline.date}</Text>
      {timeline.items?.map((item, index) => (
        <View key={index} className="w-full flex flex-row items-center">
          <View className="w-1/3 flex">
            {item.type === "credit" && (
              <>
                <Text className="text-right">{item.amount}</Text>
                <Text className="text-right">{item.description}</Text>
              </>
            )}
          </View>
          <View className="flex items-center w-1/3 ">
            {index === 0 || timeline.items.length === index + 1 ? (
              <>
                <View className="border-l border-gray-300 h-16 mx-4" />
                <View className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                <View className="border-l border-gray-300 h-16 mx-4" />
              </>
            ) : (
              <>
                <View className="border-l border-gray-300 flex-grow mx-4" />
                <View className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white" />
                <View className="border-l border-gray-300 flex-grow mx-4" />
              </>
            )}
          </View>
          <View className="w-1/3">
            {item.type === "debit" && (
              <>
                <Text>{item.amount}</Text>
                <Text>{item.description}</Text>
              </>
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

  console.log(timelineData);

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
