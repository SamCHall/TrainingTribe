import { StyleSheet } from "react-native";
import { COLORS, FONTS, SHADOWS, SIZES } from "./theme";

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
    input: {
        width: 250,
        height: 50,
        margin: 10,

        borderBottomWidth: 1,
        borderBottomColor: COLORS.white,
        color: COLORS.white,
        fontFamily: FONTS.regular,
    },
    text: {
        color: COLORS.white,
        fontFamily: FONTS.regular,
    },
    title: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontSize: 30,
    },
    subTitle: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontSize: 20,
    },
    h3: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontSize: 15,
    },
});

export default globalStyles;
