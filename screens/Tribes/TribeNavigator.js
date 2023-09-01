import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyTribe from "./MyTribe";
import CreateTribe from "./CreateTribe";
import JoinTribe from "./JoinTribe";

const TribeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyTribe" component={MyTribe} />
      {/* <Stack.Screen name='CreateTribe' component={CreateTribe} />
        <Stack.Screen name='JoinTribe' component={JoinTribe} /> */}
    </Stack.Navigator>
  );
};

export default TribeNavigator;
