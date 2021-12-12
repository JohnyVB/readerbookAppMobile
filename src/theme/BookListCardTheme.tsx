import { StyleSheet } from "react-native";

export const bookListCardStyles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        marginBottom: 25,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10
    },
    title: {
        fontWeight: 'bold',
        color: 'black'
    },
    dataContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    imageContainer: {
        flex: 1,
        marginBottom: 10
    },
    image: {
        height: 300
    },
    chaptersContaniner: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleChapter: {
       marginVertical: 5 
    },
    titleChapterText: {
        marginHorizontal: 15
    },
    typeContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'gray',
        borderRadius: 5,
        paddingVertical: 3
    },
    type: {
        color: 'white'
    },
    cafeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});