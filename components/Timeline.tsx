import { useCallback, useEffect, Fragment } from "react";
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
import { authSliceActions } from "@/redux/slices/authSlice";
import { generalSliceActions } from "@/redux/slices/generalSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/useReduxHooks";
import useAuthorization from "@/hooks/useAuthorization";
import useActivityTracker from "@/hooks/useActivityTracker";

import { HistoryItem, MergedHistoryByDate } from "@/types/data.type";

import { getTransColor } from "@/utils";
import { formatAmount } from "@/utils/number";
import { formatDate } from "@/utils/datetime";

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
const TimelineHeader = ({ header }: { header: string }) => {
  return (
    <View className="border rounded-full px-2 py-1 bg-slate-800">
      <Text className="text-white">{header}</Text>
    </View>
  );
};

const TimelineBranch = (props: TimelineBranchProps) => {
  const { timeline } = props;

  const { reActiveIdle } = useActivityTracker();
  const { authenticate } = useAuthorization();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const onOpenDetailPress = async (detail: HistoryItem) => {
    if (!authState.isSensitiveDataVisible) {
      const authRes = await authenticate();

      if (authRes.success) {
        dispatch(financeSliceActions.setHistoryDetail(detail));
        dispatch(authSliceActions.setRevealSensitiveData(true));
        router.navigate("/(root)/history-detail");
        return;
      }
    }

    if (authState.isSensitiveDataVisible) {
      dispatch(financeSliceActions.setHistoryDetail(detail));
      router.navigate("/(root)/history-detail");
    }

    reActiveIdle();
  };

  // TODO: enhance the border while there's 2 items

  return (
    <>
      <TimelineHeader header={formatDate(timeline.date)} />
      {timeline.data?.map((item, index) => (
        <View
          key={`${item.description} ${index}`}
          className="w-full flex flex-row items-center"
        >
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
                      // text: `${getTransColor(item.type, "text")}`,
                    }}
                    textColor="text-green-500"
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
                      text: "text-right",
                      // text: `text-right ${getTransColor(item.type, "text")}`,
                    }}
                    textColor="text-red-500"
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

  const { reActiveIdle } = useActivityTracker();
  const dispatch = useAppDispatch();
  const historyState = useAppSelector((state) => state.finance);

  const { loading, history } = historyState;

  // Simulate fetching more data
  const loadMoreData = useCallback(() => {
    if (!loading) dispatch(fetchHistory({ loadMore: true }));
  }, [history.items, loading]);

  useEffect(() => {
    dispatch(fetchHistory({}));
  }, []);

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        const isCloseToBottom =
          nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >=
          nativeEvent.contentSize.height - 20;

        const scrollY = nativeEvent.contentOffset.y;

        if (scrollY > 50) {
          dispatch(generalSliceActions.setHideTabBar(true));
        } else {
          dispatch(generalSliceActions.setHideTabBar(false));
        }

        // Disabled refresh when max result
        if (history.isLastResult) return;

        if (isCloseToBottom && !loading) {
          loadMoreData();
        }
      }}
      onScrollBeginDrag={() => {
        reActiveIdle();
      }}
      scrollEventThrottle={16}
      className="p-0.5" // mb-20 for end display
    >
      <Card cardClassName={{ card: className }}>
        <View className="flex items-center mb-20">
          {history.items.map((timeline, index) => (
            <Fragment key={timeline.date}>
              <TimelineBranch timeline={timeline} />
            </Fragment>
          ))}
          {history.isLastResult && <TimelineHeader header="End" />}

          {loading && (
            <View className="p-12 items-center">
              <ActivityIndicator size="large" color="#000" />
            </View>
          )}
        </View>
      </Card>
    </ScrollView>
  );
};

export default Timeline;
