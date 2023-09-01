import React from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants";

const CustomStatusBar = () => {
  return <StatusBar style="light" backgroundColor={COLORS.primary} />;
};

export default CustomStatusBar;
