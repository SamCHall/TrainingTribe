import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
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

  console.log("initialExerciseData", initialExerciseData);
  
  const initialSetNumber = () => {
    if (initialExerciseData) {
      if (initialExerciseData.sets) {
        return initialExerciseData.sets.length;
      }
    }
    return 1;
  };

  const initialWeightReps = () => {
    if (initialExerciseData) {
      if (initialExerciseData.sets) {
        return initialExerciseData.sets;
      }
    }
    return [{ weight: "", reps: "" }];
  }

  const initialDistance = () => {
    if (initialExerciseData) {
      if (initialExerciseData.distance) {
        console.log("initialExerciseData", initialExerciseData.distance);
        return initialExerciseData.distance;
      }
    }
    return "";
  }

  const initialTime = () => {
    if (initialExerciseData) {
      if (initialExerciseData.time) {
        return initialExerciseData.time;
      }
    }
    return "";
  }

  const initialSpeed = () => {
    if (initialExerciseData) {
      if (initialExerciseData.speed) {
        return initialExerciseData.speed;
      }
    }
    return "";
  }

  const initialElevation = () => {
    if (initialExerciseData) {
      if (initialExerciseData.elevation) {
        return initialExerciseData.elevation;
      }
    }
    return "";
  }

  const [setNumber, setSetNumber] = useState(initialSetNumber());
  const [weightReps, setWeightReps] = useState(initialWeightReps());
  const [distance, setDistance] = useState(initialDistance());
  const [time, setTime] = useState(initialTime());
  const [speed, setSpeed] = useState(initialSpeed());
  const [elevation, setElevation] = useState(initialElevation());

  const handleLocalDeleteExercise = () => {
    Alert.alert(
      "Delete Exercise",
      "Are you sure you want to delete this exercise?",
      [
        {
          text: "Yes",
          onPress: () => {
            setWeightReps([{ weight: "", reps: "" }]); // Reset the sets for the deleted exercise
            setDistance(""); // Reset cardio input values
            setTime("");
            setSpeed("");
            setElevation("");
            // Call the parent component's handleDeleteExercise function
            handleDeleteExercise(exercise);
          },
        },
        {
          text: "No",
          onPress: () => console.log("No pressed"),
        },
      ]
    );
  };

  useEffect(() => {
    handleAdjustedExercise();
  }, [setNumber, weightReps, distance, time, speed, elevation]);

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
  };

  const handleRepChange = (setIndex, reps) => {
    setWeightReps((prevWeightReps) => {
      const updatedWeightReps = [...prevWeightReps];
      updatedWeightReps[setIndex].reps = reps;
      return updatedWeightReps;
    });
  };

  const handleDistanceChange = (distance) => {
    setDistance(distance);
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const handleSpeedChange = (speed) => {
    setSpeed(speed);
  };

  const handleElevationChange = (elevation) => {
    setElevation(elevation);
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
        initialDistance={initialExerciseData && initialExerciseData?.distance}
        initialTime={initialExerciseData && initialExerciseData?.time}
        initialSpeed={initialExerciseData && initialExerciseData?.speed}
        initialElevation={initialExerciseData && initialExerciseData?.elevation}
        onDistanceChange={handleDistanceChange}
        onTimeChange={handleTimeChange}
        onSpeedChange={handleSpeedChange}
        onElevationChange={handleElevationChange}
        onFocus={onFocus}
      />
    );
  };

  const handleAdjustedExercise = () => {
    const exerciseData = { exercise: exercise } 
    if (exercise.type === "Cardio") {
      exerciseData.distance = distance;
      exerciseData.time = time;
      exerciseData.speed = speed;
      exerciseData.elevation = elevation;
    }
    else {
      exerciseData.sets = weightReps;
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
          style={{ position: "absolute", right: 0, top: 0, padding:15 }}
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
