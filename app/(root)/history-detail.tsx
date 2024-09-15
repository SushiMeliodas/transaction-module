import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSelector } from "@/hooks/useReduxHooks";

const HistoryDetail = () => {
  const historyDetail = useAppSelector(
    (state) => state.finance.history.details
  );
  console.log(historyDetail, "HALO");
  return (
    <SafeAreaView>
      <Text>{historyDetail.description}</Text>
    </SafeAreaView>
  );
};

export default HistoryDetail;
