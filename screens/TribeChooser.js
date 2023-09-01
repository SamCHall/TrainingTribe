import { View, Text } from "react-native";
import React from "react";
import { useUser, useApp } from "@realm/react";
import { CustomStatusBar, OvalButton } from "../components";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../constants/GlobalStyle";

const TribeChooser = () => {
  const user = useUser();
  const navigation = useNavigation();
  const app = useApp();

  console.log(user.customData.tribe);
  if (!user.customData.tribe || user.customData.tribe === null) {
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
  }
  return (
    <View>
      <Text>TribeChooser</Text>
    </View>
  );
};

export default TribeChooser;
