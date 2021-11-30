import { StyleSheet } from "react-native";

export const BookCardStyles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: 10,
        marginBottom: 25
    },
    titleContainer: {
        position: 'absolute',
        zIndex: 999,
        width: 165,
        height: 22,
        backgroundColor: 'black',
        opacity: 0.7,
    },
    titleText: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    cardImage: {
        height: 260
    },
    typeContainer: {
        position: 'absolute',
        zIndex: 999,
        top: 238,
        width: 165,
        height: 22,
        backgroundColor: 'black',
        opacity: 0.7,
    },
    typeText: {
        color: '#FFFFFF',
        textAlign: 'center'
    }
});