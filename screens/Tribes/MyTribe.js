import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { useUser } from "@realm/react";
import {
  CustomStatusBar,
  OvalButton,
  TotalVolume,
  TotalDistance,
  TotalWorkouts,
  TotalReps,
  TotalTime,
} from "../../components";
import globalStyles from "../../constants/GlobalStyle";
import { Tribe, useRealm } from "../../models";
import { COLORS } from "../../constants";
import { SIZES } from "../../constants/theme";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Alert } from "react-native";
import Collapsible from "react-native-collapsible";
import { TextButton } from "../../components";
import { ScrollView } from "react-native-gesture-handler";

const MyTribe = ({ navigation }) => {
  const realm = useRealm();
  const user = useUser();

  if (!user.customData.tribe) {
    return (
      <View>
        <OvalButton
          text="Create a Tribe"
          onPress={() => navigation.navigate("CreateTribe")}
        />
        <OvalButton
          text="Join a Tribe"
          onPress={() => navigation.navigate("JoinTribe")}
        />
      </View>
    );
  } else {
    const tribe = realm
      .objects("Tribe")
      .filtered("_id == $0", user.customData.tribe)[0];
    const leader = realm
      .objects("User")
      .filtered("_id == $0", tribe.owner_id)[0];
    const [leaderboard, setLeaderboard] = useState("Total Volume");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [collapsed, setCollapsed] = useState(true);

    const getTribeMembers = () => {
      const memberObjects = tribe.members.map((memberId) =>
        realm.objectForPrimaryKey("User", memberId)
      ); // Getting all members from their IDs
      const validMembers = memberObjects.filter((member) => member !== null); // Filtering out nulls
      return validMembers;
    };

    const renderDynamicTotal = ({ members }) => {
      if (leaderboard === "Total Volume") {
        return (
          <Text style={[globalStyles.h3]}>
            Tribe Total Volume: {Tribe.getTribeTotalVolume(members)} kg
          </Text>
        );
      } else if (leaderboard === "Total Distance") {
        return (
          <Text style={[globalStyles.h3]}>
            Tribe Total Distance: {Tribe.getTribeTotalDistance(members)} km
          </Text>
        );
      } else if (leaderboard === "Total Workouts") {
        return (
          <Text style={[globalStyles.h3]}>
            Tribe Total Workouts: {Tribe.getTribeTotalWorkouts(members)}
          </Text>
        );
      } else if (leaderboard === "Total Reps") {
        return (
          <Text style={[globalStyles.h3]}>
            Tribe Total Reps: {Tribe.getTribeTotalReps(members)}
          </Text>
        );
      } else if (leaderboard === "Total Time") {
        return (
          <Text style={[globalStyles.h3]}>
            Tribe Total Time: {Tribe.getTribeTotalCardioTime(members)} min(s)
          </Text>
        );
      }
    };

    const renderLeaderboard = ({ members }) => {
      if (leaderboard === "Total Volume") {
        return <TotalVolume members={members} />;
      } else if (leaderboard === "Total Distance") {
        return <TotalDistance members={members} />;
      } else if (leaderboard === "Total Workouts") {
        return <TotalWorkouts members={members} />;
      } else if (leaderboard === "Total Reps") {
        return <TotalReps members={members} />;
      } else if (leaderboard === "Total Time") {
        return <TotalTime members={members} />;
      }
    };

    const deleteTribe = async () => {
      setIsLoading(true);
      await realm.write(() => {
        realm.delete(tribe);
      });

      await realm.syncSession.uploadAllLocalChanges();
      await realm.syncSession.downloadAllServerChanges();
      navigation.replace("TribeChooser");
    };

    const leaveTribe = async () => {
      setIsLoading(true);
      await realm.write(() => {
        tribe.members.splice(tribe.members.indexOf(user._id), 1);
      });

      const customDataCollection = user
        .mongoClient("mongodb-atlas")
        .db("todo")
        .collection("User");
      const filter = { _id: user.id };
      const update = {
        $set: {
          tribe: undefined,
        },
      };
      await customDataCollection.updateOne(filter, update);
      await user.refreshCustomData();
      await realm.syncSession.uploadAllLocalChanges();
      navigation.replace("TribeChooser");
    };

    const handleLeaveTribe = () => {
      members = getTribeMembers();
      if (members.length === 1) {
        Alert.alert(
          "Leave Tribe",
          "Are you sure you want to leave your tribe? This will delete the tribe and you will lose all your tribe data.",
          [
            {
              text: "Yes",
              onPress: () => deleteTribe(),
            },
            {
              text: "No",
              onPress: () => console.log("No pressed"),
            },
          ]
        );
      } else {
        Alert.alert(
          "Leave Tribe",
          "Are you sure you want to leave your tribe? You will lose all your tribe data.",
          [
            {
              text: "Yes",
              onPress: () => leaveTribe(),
            },
            {
              text: "No",
              onPress: () => console.log("No pressed"),
            },
          ]
        );
      }
    };

    return (
      <View style={[globalStyles.container, { gap: 15 }]}>
        <CustomStatusBar />
        <View style={{ alignItems: "center", marginVertical:15 }}>
            <Text style={globalStyles.subTitle}>{tribe.name}</Text>
            <Text style={globalStyles.text}>Leader: {leader.username}</Text>
            <Text style={globalStyles.text}>Members: {getTribeMembers().length}</Text>
            <View style={{margin:-10, alignItems:"center"}}>
              <TextButton
                text="View Description"
                onPress={() => setCollapsed(!collapsed)}
              />
              <Collapsible collapsed={collapsed} style={{minHeight:50, maxHeight:100}}>
                <ScrollView>
                  <Text style={[globalStyles.text]}>{tribe.description}</Text>
                </ScrollView>
              </Collapsible>
            </View>

            <SelectDropdown
              defaultValue={"Total Volume"}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              showsVerticalScrollIndicator={true}
              dropdownStyle={{
                width: 150,
                height: 160,
                backgroundColor: COLORS.primary,
                borderColor: COLORS.secondary,
                borderWidth: 1,
                borderRadius: 10,
                position: "absolute",
                marginTop: -40,
                zIndex: 1,
              }}
              rowTextStyle={[globalStyles.text, { fontSize: SIZES.small }]}
              rowStyle={{
                backgroundColor: COLORS.primary,
                height: 40,
                borderBottomColor: COLORS.secondary,
                borderBottomWidth: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              dropdownOverlayColor="transparent"
              buttonStyle={{
                width: 150,
                height: 40,
                backgroundColor: COLORS.primary,
                borderColor: COLORS.secondary,
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              buttonTextStyle={[globalStyles.text, { fontSize: SIZES.small }]}
              data={[
                "Total Volume",
                "Total Distance",
                "Total Workouts",
                "Total Reps",
                "Total Time",
              ]}
              onSelect={(selectedItem) => {
                setLeaderboard(selectedItem);
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
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem;
              }}
              rowTextForSelection={(item) => {
                return item;
              }}
              selectedRowStyle={{ display: "none" }}
              disableAutoScroll={true}
            />
        </View>

        {renderLeaderboard({ members: getTribeMembers() })}
        <View style={{alignItems:"center", marginBottom:70}}>
          {renderDynamicTotal({ members: getTribeMembers() })}
        </View>
        

        <View style={globalStyles.bottomButtonContainer}>
          <ActivityIndicator
            animating={isLoading}
            size="large"
            color={COLORS.secondary}
          />
          <OvalButton text="Leave Tribe" onPress={() => handleLeaveTribe()} />
        </View>
      </View>
    );
  }
};

export default MyTribe;
