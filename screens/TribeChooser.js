import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useUser, useApp } from "@realm/react";
import { CustomStatusBar, OvalButton } from "../components";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../constants/GlobalStyle";
import { useRealm } from "../models";

const TribeChooser = () => {
  const navigation = useNavigation();
  const app = useApp();

    return (
      <View style={globalStyles.container}>
        <View style={globalStyles.centeredContainer}>
          <CustomStatusBar />
          <OvalButton
            text="Create a Tribe"
            onPress={() => navigation.navigate("CreateTribe")}
          />
          <OvalButton
            text="Join a Tribe"
            onPress={() => navigation.navigate("JoinTribe")}
          />
        </View>
        <View style={{ position: "absolute", bottom: 20, alignSelf: "center" }}>
          <OvalButton text="Log Out" onPress={() => app.currentUser.logOut()} />
        </View>
      </View>
    );
  };

export default TribeChooser;
