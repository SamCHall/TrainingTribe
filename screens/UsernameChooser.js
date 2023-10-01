import React, { useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import { CustomStatusBar, OvalButton } from "../components";
import globalStyles from "../constants/GlobalStyle";
import { useState } from "react";
import { useRealm } from "../models";
import { useUser } from "@realm/react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import { Alert } from "react-native";

function UsernameChooser() {
  const realm = useRealm();
  const user = useUser();
  const navigation = useNavigation();

  const [displayName, setDisplayName] = useState("");
  const handleSaveUsername = async () => {
    if (parseInt(displayName) >= 9 || parseInt(displayName) <= 0) {
      Alert.alert("Please enter a valid Participant ID");
      return;
    }
    const customUserDataCollection = user
      .mongoClient("mongodb-atlas")
      .db("todo")
      .collection("User");
    const filter = {
      _id: user.id, // Query for the user object of the logged in user
    };
    const updateDoc = {
      $set: {
        // Set Username if it's not already set
        username: displayName,
      },
    };
    const options = { upsert: true };
    await customUserDataCollection.updateOne(filter, updateDoc, options);
    // Refresh custom user data once it's been updated on the server
    const customUserData = await user.refreshCustomData();
    // Navigate to the main app screen
    navigation.replace("TribeChooser");
  };

  return (
    <View style={globalStyles.centeredContainer}>
      <CustomStatusBar />
      <Text style={globalStyles.h3}>Please enter your Participant ID:</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Display Name"
        placeholderTextColor={COLORS.gray}
        keyboardType="numeric"
        onChangeText={(text) => setDisplayName(text)}
        value={displayName}
      />
      <Text
        style={[
          globalStyles.text,
          { fontSize: 12, textAlign: "center", padding: 10 },
        ]}
      >
        This is the name that will be displayed to other users
      </Text>
      <Text
        style={[
          globalStyles.text,
          { fontSize: 12, textAlign: "center", padding: 10 },
        ]}
      >
        Note: You can find your Participant ID in the email you received from HallSC3@cardiff.ac.uk
      </Text>
      <OvalButton text={"Save"} onPress={() => handleSaveUsername()} />
    </View>
  );
}

export default UsernameChooser;
