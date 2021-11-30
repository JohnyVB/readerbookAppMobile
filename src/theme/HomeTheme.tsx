import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    container:{
        flex: 1
    },
    headerHomeContainer:{
        flexDirection:'row',
        marginVertical: 10, 
        marginHorizontal: 10, 
        justifyContent: 'space-between',
    },
    ImageIcon:{
        width: 50,
        height: 50
    },
    inputSearch:{
        flex: 1,
        color: '#3A3E40',
        backgroundColor: 'white',
        borderRadius: 10,
        opacity: 0.7
    },
    btnImageUserScreen:{
        marginHorizontal: 10
    },
    imageUserScreen: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginHorizontal: 25,
        justifyContent: 'space-between',
        marginVertical: 20
    },
    buttonBook: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40'
    },
    btnText: {
        fontSize: 20,
        color: 'white'
    },
    viewContainer: {
        height: 2000
    }
});