import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 110
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#3A3E40'
    },
    label: {
        marginTop: 25,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#3A3E40'
    },
    inputField: {
        color: '#3A3E40',
        backgroundColor: '#F8F7F7',
        borderRadius: 10,
        opacity: 0.7
    },
    btnLoginContainer:{
        alignItems: 'center',
        marginTop: 50
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3B688C'
    },
    btnText: {
        fontSize: 20,
        color: 'white'
    },
    btnRegisterContainer: {
        alignItems: 'flex-end',
        marginTop: 50
    }
});