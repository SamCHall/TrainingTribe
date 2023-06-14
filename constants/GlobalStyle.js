import { StyleSheet } from "react-native";
import { COLORS, FONTS, SHADOWS } from "./theme";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
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
});

export default globalStyles;
