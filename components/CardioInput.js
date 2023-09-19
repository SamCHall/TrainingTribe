import { View, Text, TextInput } from "react-native";
import React from "react";
import globalStyles from "../constants/GlobalStyle";
import { COLORS } from "../constants/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";

const CardioInput = ({
  onFocus,
  onDistanceChange,
  onSpeedChange,
  onTimeChange,
  onElevationChange,
  initialDistance,
  initialSpeed,
  initialTime,
  initialElevation,
}) => {
  const [distance, setDistance] = useState("");
  const [speed, setSpeed] = useState("");
  const [time, setTime] = useState("");
  const [elevation, setElevation] = useState("");

  useEffect(() => {
    if (initialDistance) {
      setDistance(initialDistance.toString());
    }
    if (initialSpeed) {
      setSpeed(initialSpeed.toString());
    }
    if (initialTime) {
      setTime(initialTime.toString());
    }
    if (initialElevation) {
      setElevation(initialElevation.toString());
    }
  }, []);

  const handleDistanceChange = (distance) => {
    setDistance(distance);
    const distanceDouble = parseFloat(distance);
    onDistanceChange(distanceDouble);
  };

  const handleSpeedChange = (speed) => {
    setSpeed(speed);
    const speedDouble = parseFloat(speed);
    onSpeedChange(speedDouble);
  };
  const handleTimeChange = (time) => {
    setTime(time);
    const timeDouble = parseFloat(time);
    onTimeChange(timeDouble);
  };
  const handleElevationChange = (elevation) => {
    setElevation(elevation);
    const elevationDouble = parseFloat(elevation);
    onElevationChange(elevationDouble);
  };

  return (
    <View
      style={{
        paddingBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Ionicons
          name="walk-outline"
          size={20}
          color={COLORS.tertiary}
          style={{ position: "relative", left: 20 }}
        />
        <TextInput
          style={globalStyles.smallInput}
          onFocus={onFocus}
          onChangeText={handleDistanceChange}
          placeholder="Distance"
          placeholderTextColor={COLORS.gray}
          value={distance}
          inputmode="Numeric"
          keyboardType="decimal-pad"
          returnKeyType="done"
        />
        <Text style={[globalStyles.text, { position: "relative", right: 25 }]}>
          km
        </Text>
        <Ionicons
          name="speedometer-outline"
          size={20}
          color={COLORS.tertiary}
          style={{ position: "relative", left: 20 }}
        />
        <TextInput
          style={globalStyles.smallInput}
          onFocus={onFocus}
          value={speed}
          onChangeText={handleSpeedChange}
          placeholder="Avg. Speed"
          inputmode="Numeric"
          keyboardType="decimal-pad"
          placeholderTextColor={COLORS.gray}
          returnKeyType="done"
        />
        <Text style={[globalStyles.text, { position: "relative", right: 25 }]}>
          km/h
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Ionicons
          name="timer-outline"
          size={20}
          color={COLORS.tertiary}
          style={{ position: "relative", left: 20 }}
        />
        <TextInput
          style={globalStyles.smallInput}
          onFocus={onFocus}
          onChangeText={handleTimeChange}
          value={time}
          placeholder="Time"
          placeholderTextColor={COLORS.gray}
          inputmode="Numeric"
          keyboardType="decimal-pad"
          returnKeyType="done"
        />
        <Text style={[globalStyles.text, { position: "relative", right: 25 }]}>
          min
        </Text>
        <Ionicons
          name="cellular-outline"
          size={20}
          color={COLORS.tertiary}
          style={{ position: "relative", left: 20 }}
        />
        <TextInput
          style={globalStyles.smallInput}
          onFocus={onFocus}
          onChangeText={handleElevationChange}
          value={elevation}
          placeholder="Incline"
          inputmode="Numeric"
          keyboardType="decimal-pad"
          placeholderTextColor={COLORS.gray}
          returnKeyType="done"
        />
        <Text style={[globalStyles.text, { position: "relative", right: 25 }]}>
          %
        </Text>
      </View>
    </View>
  );
};

export default CardioInput;
