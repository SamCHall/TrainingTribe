import { View, Text } from "react-native";
import React from "react";
import { useApp, useUser } from "@realm/react";
import { CustomStatusBar, OvalButton } from "../components";
import globalStyles from "../constants/GlobalStyle";
import { User, useRealm } from "../models";
import { COLORS } from "../constants/theme";

const Account = () => {
  const app = useApp();
  const realm = useRealm();

  const user = realm
    .objects("User")
    .filtered("_id == $0", app.currentUser.id)[0];

  const logOutUser = () => {
    app.currentUser.logOut();
  };

  return (
    <View style={globalStyles.container}>
      <CustomStatusBar />
      <View style={{ alignItems: "center", marginVertical: 15 }}>
        <Text style={[globalStyles.subTitle]}>
          {app.currentUser.customData.username}
        </Text>
        <Text style={[globalStyles.text, {}]}>{user.tribe.name}</Text>
      </View>
      <View style={{ margin: 10, flex: 1, gap: 10 }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: COLORS.tertiary,
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Text style={[globalStyles.h3, { paddingBottom: 5 }]}>
            Statistics:
          </Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={globalStyles.text}>
            Total workouts: {User.getWorkoutCount(user)}
          </Text>
          <Text style={globalStyles.text}>
            Favourite exercise: {User.getFavouriteExercise(user)}
          </Text>
          <Text style={globalStyles.text}>
            Cardio exercises finished: {User.getCardioExercisesCompleted(user)}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={globalStyles.text}>
              Total volume: {User.getTotalWorkoutVolume(user)} kg
            </Text>
            <Text style={globalStyles.text}>
              Total reps: {User.getTotalReps(user)}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end", gap: 5 }}>
            <Text style={globalStyles.text}>
              Max weight lifted: {User.getMaxWeight(user)} kg
            </Text>

            <Text style={globalStyles.text}>
              Distance travelled: {User.getTotalCardioDistance(user)} km
            </Text>
          </View>
        </View>
      </View>

      <OvalButton text="Log Out" onPress={logOutUser} />
    </View>
  );
};

export default Account;
