import { View, Text } from "react-native";
import React from "react";
import { useApp } from "@realm/react";
import globalStyles from "../constants/GlobalStyle";

const HomeHeader = () => {
  const app = useApp();

  return (
    <View>
      <Text style={globalStyles.text}>
        Welcome {app.currentUser.customData.username}
      </Text>
    </View>
  );
};

export default HomeHeader;
