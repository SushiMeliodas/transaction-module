import { View, Text, ScrollView } from "react-native";

import { HistoryItem } from "@/types/constants.type";

import { history } from "@/constant";

import Card from "./common/Card";

interface TimelineBranchProps {
  historyItem: HistoryItem;
}

const TimelineBranch = ({ historyItem }: TimelineBranchProps) => {
  return (
    <>
      <Text>{historyItem.date}</Text>
      <View className="border-l border-gray-300 h-16 mx-4" />
    </>
  );
};

// Main Component
const Timeline = () => {
  // TODO: generate history item

  return (
    <Card>
      <ScrollView>
        <View className="flex items-center">
          {/* {history.map((historyItem, index) => (
            <TimelineBranch historyItem={historyItem} />
          ))} */}
        </View>
      </ScrollView>
    </Card>
  );
};

export default Timeline;
