import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Portfolio = () => {
  return (
    <SafeAreaView>
      <Text>Portfolio</Text>
      <Link href="/portfolio/transaction">
        <Text>Transaction</Text>
      </Link>
    </SafeAreaView>
  );
};

export default Portfolio;
