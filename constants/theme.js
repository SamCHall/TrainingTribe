import Constants from "expo-constants";
const { statusBarHeight } = Constants;


// ios is 0 as the status bar is translucent by default
const statusBarHeightFunction = () => {
  Platform.OS === "android" ? statusBarHeight : 0
}

export const COLORS = {
  primary: "#001C30",
  secondary: "#64CCC5",
  tertiary: "#176B87",

  white: "#DAFFFB",
  gray: "#74858C",
  darkgray: "#4D626C",

  gold: "#FFD700",
  silver: "#C0C0C0",
  bronze: "#CD7F32",
};

export const SIZES = {
  base: 8,
  small: 12,
  font: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  statusBarHeight: statusBarHeightFunction(),
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.tertiary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  medium: {
    shadowColor: COLORS.tertiary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  dark: {
    shadowColor: COLORS.tertiary,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
};
