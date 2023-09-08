import { View, Text } from "react-native";
import React from "react";
import globalStyles from "../../constants/GlobalStyle";
import { FlatList } from "react-native-gesture-handler";
import { User } from "../../models";
import MyTribeLeaderboard from "../MyTribeLeaderboard";

const TotalReps = ({ members }) => {
  const sortMembersByTotalReps = () => {
    const sortedMembers = members.sort(
      (a, b) => User.getTotalReps(b) - User.getTotalReps(a)
    );
    return sortedMembers;
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          globalStyles.leaderboardEntry,
          { borderTopWidth: 0, borderBottomWidth: 3 },
        ]}
      >
        <Text style={[globalStyles.h3, { marginLeft: 20 }]}>Username</Text>
        <Text style={globalStyles.h3}>Total Reps</Text>
      </View>
      <FlatList
        data={sortMembersByTotalReps()}
        style={{ justifySelf: "flex-start" }}
        renderItem={({ item, index }) => (
          <MyTribeLeaderboard user={item} index={index} metric="reps" />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default TotalReps;
