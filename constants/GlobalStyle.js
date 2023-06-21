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
        alignSelf: 'center',
    },
    h3: {
        color: COLORS.white,
        fontFamily: FONTS.bold,
        fontSize: 15,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        padding: 20,
        marginTop: 100,
        marginBottom: 100,
        margin: 20,
        ...SHADOWS.medium,
    },
    categoryItem: {
        padding: 10,
        backgroundColor: COLORS.primary,
        borderColor: COLORS.secondary,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    collapsibleContainer: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.secondary,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        
    },
    exerciseItemText: {
        color: COLORS.white,
        fontFamily: FONTS.regular
    },
    exerciseItem: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.light,
    },
    smallInput: {
        width: 75,
        height: 50,
        margin: 10,
        marginLeft:30,
        marginRight:30,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.white,
        color: COLORS.white,
        fontFamily: FONTS.regular,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    emptyListComponent: {
        flex: 1,
        marginTop: 300,
        marginBottom: 300,
        alignSelf: 'center',
        color: COLORS.white,
        fontFamily: FONTS.regular,
    },

});

export default globalStyles;
