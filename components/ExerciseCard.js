import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { COLORS, SIZES, SHADOWS } from '../constants';
import globalStyles from '../constants/GlobalStyle';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { TextButton } from './button';
import WeightRepInput from './WeightRepInput';

const ExerciseCard = ({ exercise, onAddExerciseSet }) => {
  const [setNumber, setSetNumber] = useState(1);
  const [weightReps, setWeightReps] = useState([]);

  const handleAddSet = () => {
    setSetNumber((prevNumber) => prevNumber + 1);
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

  const renderWeightRepInputs = () => {
    const inputs = [];
    for (let i = 0; i < setNumber; i++) {
      inputs.push(
        <WeightRepInput
          key={i}
          number={i + 1}
          weight={weightReps[i]?.weight}
          reps={weightReps[i]?.reps}
          onWeightChange={(weight) => handleWeightChange(i, weight)}
          onRepChange={(reps) => handleRepChange(i, reps)}
        />
      );
    }
    return inputs;
  };

  const handleFinishExercise = () => {
    onAddExerciseSet(exercise, weightReps);
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.medium,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
      }}
    >
      <Text style={globalStyles.h3}>{exercise.name}</Text>

      {/* Render weight and rep inputs */}
      {renderWeightRepInputs()}

      {/* Button to add a new set */}
      <TextButton text="Add Set" onPress={handleAddSet} />

    </View>
  );
};

export default ExerciseCard;
