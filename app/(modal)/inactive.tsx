import { View, Image } from "react-native";

import splashIcon from "@/assets/images/icon.png";

const Inactive = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Image source={splashIcon} className="w-20 h-20" resizeMode="contain" />
    </View>
  );
};

export default Inactive;
