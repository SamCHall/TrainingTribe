import React from "react";
import { View, Text } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../constants";
import globalStyles from "../constants/GlobalStyle";
import Ionicons from "react-native-vector-icons/Ionicons";

const ExerciseCardReadOnly = ({ exercise }) => {
  const renderWeightRepInputs = () => {
    return exercise.sets.map((set, index) => (
      <View
        key={index}
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <Text style={globalStyles.text}>{index + 1}</Text>

        <View style={{ flexDirection: "row" }}>
          <Ionicons name="barbell-outline" size={20} color={COLORS.tertiary} />
          <Text style={[globalStyles.text, { paddingLeft: 5 }]}>
            Weight: {set.weight} kg
          </Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Ionicons name="repeat-outline" size={20} color={COLORS.tertiary} />
          <Text style={[globalStyles.text, { paddingLeft: 5 }]}>
            Reps: {set.reps}
          </Text>
        </View>
      </View>
    ));
  };

  const renderCardioInputs = () => {
    return exercise.cardioTracking.map((set, index) => (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "column", paddingVertical: 20 }}>
          <View style={{ flexDirection: "row", paddingVertical: 10 }}>
            <Ionicons name="walk-outline" size={20} color={COLORS.tertiary} />
            <Text style={[globalStyles.text, { paddingLeft: 5 }]}>
              Distance: {set.distance} km
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Ionicons name="timer-outline" size={20} color={COLORS.tertiary} />
            <Text style={[globalStyles.text, { paddingLeft: 5 }]}>
              Time: {set.time} min(s)
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column", paddingVertical: 20 }}>
          <View style={{ flexDirection: "row", paddingVertical: 10 }}>
            <Ionicons
              name="speedometer-outline"
              size={20}
              color={COLORS.tertiary}
            />
            <Text style={[globalStyles.text, { paddingLeft: 5 }]}>
              Speed: {set.speed} km/h
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="cellular-outline"
              size={20}
              color={COLORS.tertiary}
            />
            <Text style={[globalStyles.text, { paddingLeft: 5 }]}>
              Incline: {set.elevation}%
            </Text>
          </View>
        </View>
      </View>
    ));
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
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: COLORS.tertiary,
          width: "100%",
          paddingVertical: 10,
        }}
      >
        <Text style={[globalStyles.subTitle]}>{exercise.name}</Text>
        <Text style={[globalStyles.h3, { alignSelf: "center" }]}>
          {exercise.type}
        </Text>
      </View>

      {/* Render weight and rep inputs */}
      {exercise.type !== "Cardio" && renderWeightRepInputs()}
      {exercise.type === "Cardio" && renderCardioInputs()}
    </View>
  );
};

export default ExerciseCardReadOnly;
