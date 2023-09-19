import { View, Text, TextInput, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, SHADOWS, SIZES } from "../constants";
import globalStyles from "../constants/GlobalStyle";
import Ionicons from "react-native-vector-icons/Ionicons";

const WeightRepInput = ({
  number,
  onWeightChange,
  onRepChange,
  onFocus,
  initialWeight,
  initialReps,
}) => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  useEffect(() => {
    if (initialWeight) {
      setWeight(initialWeight.toString());
    }
    if (initialReps) {
      setReps(initialReps.toString());
    }
  }, []);

  const handleWeightChange = (weight) => {
    console.log("weight", weight);
    setWeight(weight);
    const weightDouble = parseFloat(weight);
    console.log("weightDouble", weightDouble);
    onWeightChange(weightDouble);
  };

  const handleRepChange = (reps) => {
    setReps(reps);
    const repsNumber = parseInt(reps);
    console.log("repsNumber", repsNumber);
    onRepChange(repsNumber);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={[globalStyles.text]}>{number}.</Text>

      <Ionicons
        name="barbell-outline"
        size={20}
        color={COLORS.tertiary}
        style={{ position: "relative", left: 20 }}
      />
      <TextInput
        style={globalStyles.smallInput}
        onFocus={onFocus}
        onChangeText={handleWeightChange}
        placeholder="Weight"
        placeholderTextColor={COLORS.gray}
        inputmode="Numeric"
        keyboardType="decimal-pad"
        returnKeyType="done"
        value={weight} // Set initial weight value if it exists
      />
      <Text style={[globalStyles.text, { position: "relative", right: 25 }]}>
        kg
      </Text>

      <Ionicons
        name="repeat-outline"
        size={20}
        color={COLORS.tertiary}
        style={{ position: "relative", left: 20 }}
      />
      <TextInput
        style={globalStyles.smallInput}
        onFocus={onFocus}
        onChangeText={handleRepChange}
        placeholder="Reps"
        inputmode="Numeric"
        keyboardType="decimal-pad"
        placeholderTextColor={COLORS.gray}
        returnKeyType="done"
        value={reps} // Set initial reps value if it exists
      />
    </View>
  );
};

export default WeightRepInput;
