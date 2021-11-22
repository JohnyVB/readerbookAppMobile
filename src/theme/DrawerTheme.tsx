import { StyleSheet } from "react-native";

export const drawerstyles = StyleSheet.create({
    container:{
        flex: 1,
        marginHorizontal: 20
    },
    avatarContainer:{
        flex: 1, 
        alignItems: 'center',
        marginTop: 20
    },
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 100
    },
    menuContainer: {
        marginVertical: 30,
        alignItems: 'center'
    },
    btn:{
        marginVertical: 10
    },
    btnText:{
        fontSize: 20
    },
    btnClose:{
        marginVertical: 10,
        backgroundColor: '#CC3D3D',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5
    },
    textClose:{
        fontSize: 20,
        color: 'white'
    }
});