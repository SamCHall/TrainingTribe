import { View, Text } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES, SHADOWS } from "../constants";
import globalStyles from "../constants/GlobalStyle";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { TextButton } from "./button";
import WeightRepInput from "./WeightRepInput";
import CardioInput from "./CardioInput";
import Ionicons from "react-native-vector-icons/Ionicons";

const ExerciseCard = ({
  exercise,
  onAdjustedExercise,
  onFocus,
  handleDeleteExercise,
  initialExerciseData,
  index
}) => {

  const initialSetNumber = () => {
    if (initialExerciseData) {
      if (initialExerciseData.sets) {
        return initialExerciseData.sets.length;
      }
    }
    return 1;
  };

  const [setNumber, setSetNumber] = useState(initialSetNumber());
  const [weightReps, setWeightReps] = useState([{ weight: "", reps: "" }]);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [elevation, setElevation] = useState(0);

  const handleLocalDeleteExercise = () => {
    // Deleting an exercise
    setWeightReps([{ weight: "", reps: "" }]); // Reset the sets for the deleted exercise
    setDistance(0); // Reset cardio input values
    setTime(0);
    setSpeed(0);
    setElevation(0);
    // Call the parent component's handleDeleteExercise function
    handleDeleteExercise(exercise);
  };

  const handleAddSet = () => {
    setSetNumber((prevNumber) => prevNumber + 1);
    setWeightReps((prevWeightReps) => [
      ...prevWeightReps,
      { weight: "", reps: "" },
    ]);
  };

  const handleWeightChange = (setIndex, weight) => {
    setWeightReps((prevWeightReps) => {
      const updatedWeightReps = [...prevWeightReps];
      updatedWeightReps[setIndex].weight = weight;
      return updatedWeightReps;
    });
    handleAdjustedExercise();
  };

  const handleRepChange = (setIndex, reps) => {
    setWeightReps((prevWeightReps) => {
      const updatedWeightReps = [...prevWeightReps];
      updatedWeightReps[setIndex].reps = reps;
      return updatedWeightReps;
    });
    handleAdjustedExercise();
  };

  const handleDistanceChange = (distance) => {
    setDistance(distance);
    handleAdjustedExercise();
  };

  const handleTimeChange = (time) => {
    setTime(time);
    handleAdjustedExercise();
  };

  const handleSpeedChange = (speed) => {
    setSpeed(speed);
    handleAdjustedExercise();
  };

  const handleElevationChange = (elevation) => {
    setElevation(elevation);
    handleAdjustedExercise();
  };

  const renderWeightRepInputs = () => {
    const inputs = [];
    for (let i = 0; i < setNumber; i++) {
      inputs.push(
        <WeightRepInput
          key={i}
          number={i + 1}
          initialWeight={initialExerciseData && initialExerciseData.sets[i]?.weight}
          initialReps={initialExerciseData && initialExerciseData.sets[i]?.reps}
          onWeightChange={(weight) => handleWeightChange(i, weight)}
          onRepChange={(reps) => handleRepChange(i, reps)}
          onFocus={onFocus}
        />
      );
    }
    return inputs;
  };

  const renderCardioInputs = () => {
    return (
      <CardioInput
        onDistanceChange={handleDistanceChange}
        onTimeChange={handleTimeChange}
        onSpeedChange={handleSpeedChange}
        onElevationChange={handleElevationChange}
        onFocus={onFocus}
      />
    );
  };

  const handleAdjustedExercise = () => {
    const exerciseData = { exercise: exercise, sets: weightReps };
    if (exercise.type === "Cardio") {
      exerciseData.distance = distance;
      exerciseData.time = time;
      exerciseData.speed = speed;
      exerciseData.elevation = elevation;
    }
    onAdjustedExercise(exerciseData);
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.medium,
      }}
    >
      <Text style={[globalStyles.h3, { marginTop: 10 }]}>{exercise.name}</Text>
      <Ionicons
        name="trash"
        size={20}
        color={"red"}
        onPress={() => handleLocalDeleteExercise()}
        style={{ position: "absolute", right: 10, top: 10 }}
      />

      {exercise.type !== "Cardio" && (
        <>
          {renderWeightRepInputs()}
          <TextButton text="Add Set" onPress={handleAddSet} />
        </>
      )}
      {exercise.type === "Cardio" && <>{renderCardioInputs()}</>}
    </View>
  );
};

export default ExerciseCard;
