import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../constants/GlobalStyle";
import { CustomStatusBar, OvalButton } from "../../components";
import { useQuery, useRealm } from "../../models";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useApp, useUser } from "@realm/react";
import WorkoutCard from "../../components/WorkoutCard";
import { COLORS } from "../../constants";

const ExistingWorkouts = ({ navigation }) => {
  const realm = useRealm();
  const user = useUser();

  const getWorkouts = () => {
    const workouts = realm
      .objects("Workout")
      .filtered("owner_id == $0", user.id)
      .sorted("date", true);
    return workouts;
  };

  const handleNewWorkoutPress = () => {
    navigation.navigate("NewWorkout");
  };

  return (
    <View style={globalStyles.container}>
      <CustomStatusBar />
      <FlatList
        data={getWorkouts()}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View style={[globalStyles.emptyListComponent, {gap:20}]}>
            <Text style={[globalStyles.h3, {textAlign:'center', color:COLORS.secondary}]}>No Workouts</Text>
            <Text style={globalStyles.text}>Create a new workout to get started!</Text>
          </View>
        )}
      />
      <View style={globalStyles.bottomButtonContainer}>
        <OvalButton text="New Workout" onPress={handleNewWorkoutPress} />
      </View>
    </View>
  );
};

export default ExistingWorkouts;
