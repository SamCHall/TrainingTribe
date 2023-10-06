import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../../constants/GlobalStyle";
import { CustomStatusBar, OvalButton } from "../../components";
import { useQuery, useRealm } from "../../models";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useApp, useUser } from "@realm/react";
import WorkoutCard from "../../components/WorkoutCard";
import { COLORS } from "../../constants";
import * as SecureStore from "expo-secure-store";

const ExistingWorkouts = ({ navigation }) => {
  const realm = useRealm();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [existingWorkout, setExistingWorkout] = useState(null);

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

  const renderWorkoutButton = () => {
    if (isLoading) {
      return (
        <View style={globalStyles.centeredContainer}>
          <CustomStatusBar />
          <ActivityIndicator
            size="large"
            color={COLORS.secondary}
            animating={true}
          />
        </View>
      );
    }

    if (existingWorkout) {
      return (
        <View style={globalStyles.bottomButtonContainer}>
          <OvalButton text="Continue Workout" onPress={handleNewWorkoutPress} />
        </View>
      );
    } else {
      return (
        <View style={globalStyles.bottomButtonContainer}>
          <OvalButton text="New Workout" onPress={handleNewWorkoutPress} />
        </View>
      );
    }
  }

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const workoutData = await SecureStore.getItemAsync(`workoutData-${user.id}`);
        if (isMounted) {
          
          if (workoutData!=null)
          {
            setExistingWorkout(true);
            setIsLoading(false);
          }
          else
          {
            setExistingWorkout(false);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching workoutData:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [existingWorkout]);

  return (
    <View style={globalStyles.container}>
      <CustomStatusBar />
      <FlatList
        data={getWorkouts()}
        renderItem={({ item }) => <WorkoutCard workout={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View style={[globalStyles.emptyListComponent, { gap: 20 }]}>
            <Text
              style={[
                globalStyles.h3,
                { textAlign: "center", color: COLORS.secondary },
              ]}
            >
              No Workouts
            </Text>
            <Text style={globalStyles.text}>
              Create a new workout to get started!
            </Text>
          </View>
        )}
      />
      {renderWorkoutButton()}
    </View>
  );
};

export default ExistingWorkouts;
