import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { TextButton } from "./button";
import { useApp, useUser } from "@realm/react";
import { useQuery, useRealm } from "../models";
import { useEffect } from "react";
import globalStyles from "../constants/GlobalStyle";
import { COLORS, SIZES } from "../constants";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import "react-native-get-random-values";
import Ionicons from "react-native-vector-icons/Ionicons";
import InfoIcon from "./Icons/InfoIcon";

const NewWorkoutHeader = ({ onFinishWorkout }) => {
  const realm = useRealm();
  const app = useApp();
  const user = useUser();
  const workouts = useQuery("Workout");
  const exercises = useQuery("Exercise");
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  useEffect(() => {
    setInfoModalVisible(true);
  }, []);

  const dropdownData = [
    "Push",
    "Pull",
    "Legs",
    "Core",
    "Cardio",
    "Upper",
    "Lower",
    "Push/Pull",
    "Push/Pull/Legs",
    "Upper/Lower",
    "Full Body",
    "Other",
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: COLORS.tertiary,
      }}
    >
      <View
        style={{
          alignItems: "flex-start",
        }}
      >
        <TextButton
          text="Cancel"
          onPress={() =>
            Alert.alert("Cancel", "Are you sure? Your workout will be lost", [
              {
                text: "Yes",
                onPress: () => navigation.replace("ExistingWorkouts"),
              },
              {
                text: "No",
                onPress: () => console.log("No pressed"),
              },
            ])
          }
        />
      </View>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={globalStyles.subTitle}>Workout log</Text>
        <InfoIcon topic={'workout'} setInitialModalVisible={infoModalVisible}/>
      </View>
      <View
        style={{
          alignItems: "flex-end",
        }}
      >
        <TextButton
          text="Finish"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View style={globalStyles.outerModalContainer}>
          <View style={globalStyles.innerModalContainer}>
            <Text style={globalStyles.subTitle}>Finish Workout</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[globalStyles.text]}>Workout Name:</Text>
              <TextInput
                style={[globalStyles.input, { width: 150 }]}
                placeholder="Workout Name"
                placeholderTextColor={COLORS.gray}
                onChangeText={(text) => setWorkoutName(text)}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[globalStyles.text]}>Workout Type:</Text>
              <SelectDropdown
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                showsVerticalScrollIndicator={true}
                dropdownStyle={{
                  width: 150,
                  height: 250,
                  backgroundColor: COLORS.primary,
                  borderColor: COLORS.secondary,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                rowTextStyle={[globalStyles.text, { fontSize: SIZES.small }]}
                dropdownOverlayColor="transparent"
                buttonStyle={{
                  width: 150,
                  height: 50,
                  backgroundColor: COLORS.primary,
                  borderColor: COLORS.secondary,
                  borderWidth: 1,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 10,
                  marginRight: 15,
                }}
                buttonTextStyle={[globalStyles.text, { fontSize: SIZES.small }]}
                defaultButtonText="Press to select"
                data={dropdownData}
                onSelect={(selectedItem, index) => {
                  setWorkoutType(selectedItem);
                }}
                renderDropdownIcon={() => {
                  if (dropdownOpen) {
                    return (
                      <Ionicons
                        name="chevron-up"
                        size={20}
                        color={COLORS.secondary}
                      />
                    );
                  }
                  return (
                    <Ionicons
                      name="chevron-down"
                      size={20}
                      color={COLORS.secondary}
                    />
                  );
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                selectedRowStyle={{ display: "none" }}
                disableAutoScroll={true}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <TextButton
                text="Cancel"
                onPress={() => setModalVisible(false)}
              />
              <TextButton
                text="Finish"
                onPress={() => {
                  if (workoutName == "" || workoutType == "") {
                    Alert.alert("Error", "Please fill out all fields");
                    return;
                  } else if (workoutName.length > 20) {
                    Alert.alert(
                      "Error",
                      "Workout name must be less than 20 characters"
                    );
                    return;
                  }
                  Alert.alert(
                    "Finish Workout",
                    "Are you sure you want to finish this workout?",
                    [
                      {
                        text: "Yes",
                        onPress: () => {
                          onFinishWorkout(workoutName, workoutType);
                          setModalVisible(false);
                        },
                      },
                      {
                        text: "No",
                      },
                    ]
                  );
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewWorkoutHeader;
