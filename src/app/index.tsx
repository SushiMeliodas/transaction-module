import { Redirect } from "expo-router";
import { Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return <Redirect href="/(auth)/login" />;

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView>
        <Text>Home</Text>
      </SafeAreaView>
    </>
  );
};

export default Home;
