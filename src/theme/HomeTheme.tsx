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
    titleApp: {
        flex: 1,
        color: '#3A3E40',
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 41,
        fontStyle: 'italic',
        fontFamily: ''
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
        justifyContent: 'space-around',
        marginVertical: 10
    },
    buttonBook: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40'
    },
    buttonSearch: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3B688C',
        marginHorizontal: 20
    },
    btnText: {
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 30
    },
    viewContainer: {
        height: 2000
    }
});