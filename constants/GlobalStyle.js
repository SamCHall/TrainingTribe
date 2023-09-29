import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "./theme";
import { Platform } from "react-native";

//Fonts:
//Roboto_100Thin,
//Roboto_300Light,
//Roboto_400Regular,
//Roboto_500Medium,
//Roboto_700Bold,
//Roboto_900Black

const fontFamily = (weight) => {
  if (Platform.OS === "android") {
    switch (weight) {
      case "thin":
        return "Roboto_100Thin";
      case "light":
        return "Roboto_300Light";
      case "regular":
        return "Roboto_400Regular";
      case "medium":
        return "Roboto_500Medium";
      case "bold":
        return "Roboto_700Bold";
      case "black":
        return "Roboto_900Black";
      default:
        return "Roboto_400Regular";
  }
  }
  if (Platform.OS === "ios") {
    return null;
  }
};

const fontWeights = (weight) => {
  if (Platform.OS === "android") {
    return null;
  }
  if (Platform.OS === "ios") {
    switch (weight) {
      case "thin":
        return "100";
      case "light":
        return "300";
      case "regular":
        return "400";
      case "medium":
        return "500";
      case "bold":
        return "700";
      case "black":
        return "900";
      default:
        return "400";
    }
  }
};


const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    marginTop: SIZES.statusBarHeight,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    marginTop: SIZES.statusBarHeight,
  },
  fullPageContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    marginTop: SIZES.statusBarHeight,
    margin: SIZES.medium,
  },
  input: {
    width: 250,
    height: 50,
    margin: 10,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    color: COLORS.white,
    fontFamily: fontFamily('regular'),
    fontWeight: fontWeights('regular'),
  },
  text: {
    color: COLORS.white,
    fontFamily: fontFamily('regular'),
    fontWeight: fontWeights('regular'),
  },
  title: {
    color: COLORS.white,
    fontFamily: fontFamily('bold'),
    fontWeight: fontWeights('bold'),
    fontSize: 30,
  },
  subTitle: {
    color: COLORS.white,
    fontFamily: fontFamily('bold'),
    fontWeight: fontWeights('bold'),
    fontSize: 20,
    alignSelf: "center",
  },
  h3: {
    color: COLORS.white,
    fontFamily: fontFamily('bold'),
    fontWeight: fontWeights('bold'),
    fontSize: 15,
  },
  outerModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000080",
  },
  innerModalContainer: {
    width: 300,
    height: 300,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    ...SHADOWS.medium,
  },
  categoryItem: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  collapsibleContainer: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.secondary,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  exerciseItemText: {
    color: COLORS.white,
    fontFamily: fontFamily('regular'),
    fontWeight: fontWeights('regular'),
  },
  exerciseItem: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.light,
  },
  smallInput: {
    width: 75,
    height: 50,
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    color: COLORS.white,
    fontFamily: fontFamily('regular'),
    fontWeight: fontWeights('regular'),
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  emptyListComponent: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: SIZES.large,
  },
  leaderboardEntry: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    margin: 10,
    marginTop: -1,
    marginBottom: 0,
    borderTopWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.primary,
  },
  clickableText: {
    color: COLORS.secondary,
    fontFamily: fontFamily('medium'),
    fontWeight: fontWeights('medium'),
  },
});

export default globalStyles;
