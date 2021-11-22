import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
    headerHomeContainer:{
        flexDirection:'row',
        marginVertical: 10, 
        marginHorizontal: 10, 
        justifyContent: 'space-between'
    },
    imageUserScreen: {
        width: 50,
        height: 50,
        borderRadius: 100
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
    }
    
});