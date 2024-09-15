import { useState, useCallback, useEffect, Fragment } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

import { fetchHistory } from "@/redux/actions/financeActions";
import { financeSliceActions } from "@/redux/slices/financeSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";

import { HistoryItem, MergedHistoryByDate } from "@/types/data.type";

import { formatAmount, formatDate, getTransColor } from "@/utils";

import Card from "./common/Card";
import UnmaskText from "./common/UnmaskText";

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

  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const onOpenDetailPress = (detail: HistoryItem) => {
    if (authState.isSensitiveDataVisible) {
      dispatch(financeSliceActions.setHistoryDetail(detail));
      router.push("/(root)/history-detail");
    }
  };

  // TODO: enhance the border while there's 2 items

  return (
    <>
      <View className="border rounded-full p-1.5 bg-slate-800">
        <Text className="text-white">{formatDate(timeline.date)}</Text>
      </View>
      {timeline.data?.map((item, index) => (
        <View key={index} className="w-full flex flex-row items-center">
          <View className="w-2/5">
            {item.type === "credit" && (
              <TouchableOpacity
                onPress={() => {
                  onOpenDetailPress(item);
                }}
              >
                <>
                  <UnmaskText
                    value={formatAmount(item.amount, item.type)}
                    unmaskClassName={{
                      main: "justify-end",
                      text: `${getTransColor(item.type, "text")}`,
                    }}
                    hideMaskBtn
                  />
                  <Text className="text-right">{item.description}</Text>
                </>
              </TouchableOpacity>
            )}
          </View>
          <View className="flex items-center w-1/5 ">
            <View
              className={`border-l border-gray-300 mx-4 ${
                index === 0 || index === timeline.data.length - 1
                  ? "h-16"
                  : "flex-grow"
              }`}
            />
            <View
              className={`w-4 h-4 ${getTransColor(
                item.type
              )} rounded-full border-2 border-white`}
            />
            <View
              className={`border-l border-gray-300 mx-4 ${
                index === 0 || index === timeline.data.length - 1
                  ? "h-16"
                  : "flex-grow"
              }`}
            />
          </View>
          <View className="w-2/5">
            {item.type === "debit" && (
              <TouchableOpacity
                onPress={() => {
                  onOpenDetailPress(item);
                }}
              >
                <>
                  <UnmaskText
                    value={formatAmount(item.amount, item.type)}
                    unmaskClassName={{
                      text: `text-right ${getTransColor(item.type, "text")}`,
                    }}
                    hideMaskBtn
                  />
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

  const dispatch = useAppDispatch();
  const historyState = useAppSelector((state) => state.finance);

  const { loading, history } = historyState;

  // Simulate fetching more data
  const loadMoreData = useCallback(() => {
    if (!loading) dispatch(fetchHistory({ loadMore: true }));
  }, [history.items, loading]);

  useEffect(() => {
    dispatch(fetchHistory({}));

    // return () => {
    //   second
    // }
  }, []);

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        const isCloseToBottom =
          nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
          nativeEvent.contentSize.height - 20;

        // Disabled refresh when max result
        if (history.isLastResult) return;

        if (isCloseToBottom && !loading) {
          loadMoreData();
        }
      }}
      scrollEventThrottle={16}
      className="p-0.5"
    >
      <Card cardClassName={{ card: className }}>
        <View className="flex items-center">
          {history.items.map((timeline, index) => (
            <Fragment key={timeline.date}>
              <TimelineBranch timeline={timeline} />
            </Fragment>
          ))}
          {history.isLastResult && <Text>End</Text>}

          {loading && (
            <View className="p-5 items-center">
              <ActivityIndicator size="small" color="#000" />
              <Text>Loading more...</Text>
            </View>
          )}
        </View>
      </Card>
    </ScrollView>
  );
};

export default Timeline;
