import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useApp, useUser } from "@realm/react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "./Feed";
import Workouts from "./Workouts/Workouts";
import Account from "./Account";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import globalStyles from "../constants/GlobalStyle";
import TribeNavigator from "./Tribes/TribeNavigator";
import { useRealm } from "../models";

const Tab = createBottomTabNavigator();

const Home = () => {
  useEffect(() => {
    user.refreshCustomData();
  }, []);

  const realm = useRealm();
  const user = useUser();
  const navigation = useNavigation();
  const tribe = realm.objects("Tribe").filtered("_id == $0", user.customData.tribe)[0];

  if (!user.customData.username) {
    navigation.replace("UsernameChooser");
  } else if (!tribe) {
    navigation.replace("TribeChooser");
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopColor: COLORS.tertiary,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabel: ({ focused }) => {
          // Hide the label if the icon is not focused
          if (!focused) {
            return null;
          }

          // Otherwise, provide the label text based on the route name
          if (route.name === "Compete") {
            return (
              <Text style={[globalStyles.text, { fontSize: 12 }]}>Compete</Text>
            );
          } else if (route.name === "Workouts") {
            return (
              <Text style={[globalStyles.text, { fontSize: 12 }]}>
                Workouts
              </Text>
            );
          } else if (route.name === "TribeNavigator") {
            return (
              <Text style={[globalStyles.text, { fontSize: 12 }]}>MyTribe</Text>
            );
          } else if (route.name === "Account") {
            return (
              <Text style={[globalStyles.text, { fontSize: 12 }]}>Account</Text>
            );
          }
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Compete") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "Workouts") {
            iconName = focused ? "barbell" : "barbell-outline";
          } else if (route.name === "TribeNavigator") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.tertiary,
      })}
      initialRouteName={"Compete"}
      sceneContainerStyle={{ backgroundColor: COLORS.primary }}
    >
      <Tab.Screen name="Compete" component={Feed} />
      <Tab.Screen name="Workouts" component={Workouts} />
      <Tab.Screen name="TribeNavigator" component={TribeNavigator} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default Home;
