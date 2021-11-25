import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        marginHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 110
    },
    containerTitle: {
        alignItems: 'center'
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3B688C'
    },
    btnNew: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40'
    },
    btnText: {
        fontSize: 20,
        color: 'white'
    },
    btnRegisterContainer: {
        alignItems: 'flex-end',
        marginTop: 50
    },
    btnReturn: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#CC3D3D',
    }
});