import { View, Text } from "react-native";
import React from "react";
import globalStyles from "../constants/GlobalStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { User } from "../models";
import { useNavigation } from "@react-navigation/native";

const MyTribeLeaderboard = ({ user, index, metric }) => {
  const navigation = useNavigation();

  const renderMedal = (index) => {
    if (index === 0) {
      return <Text style={[globalStyles.text]}>🥇</Text>;
    } else if (index === 1) {
      return <Text style={[globalStyles.text]}>🥈</Text>;
    } else if (index === 2) {
      return <Text style={[globalStyles.text]}>🥉</Text>;
    }
  };

  const renderMetric = (metric) => {
    if (metric === "volume") {
      return (
        <Text style={globalStyles.text}>
          {User.getTotalWorkoutVolume(user)} kg
        </Text>
      );
    } else if (metric === "distance") {
      return (
        <Text style={globalStyles.text}>
          {User.getTotalCardioDistance(user)} km
        </Text>
      );
    } else if (metric === "workouts") {
      return (
        <Text style={globalStyles.text}>{User.getWorkoutCount(user)}</Text>
      );
    } else if (metric === "reps") {
      return <Text style={globalStyles.text}>{User.getTotalReps(user)}</Text>;
    } else if (metric === "time") {
      return (
        <Text style={globalStyles.text}>{User.getTotalCardioTime(user)} min(s)</Text>
      );
    }
  };

  return (
    <View style={globalStyles.leaderboardEntry}>
      <View>
        <Text style={globalStyles.h3}>{index + 1}.</Text>
      </View>
      <View style={{ flex: 1, marginLeft: 15 }}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile", user)}>
          <Text style={globalStyles.clickableText}>
            {user.username} {renderMedal(index)}
          </Text>
        </TouchableOpacity>
      </View>
      <View>{renderMetric(metric)}</View>
    </View>
  );
};

export default MyTribeLeaderboard;
