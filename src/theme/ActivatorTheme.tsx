import { StyleSheet } from "react-native";

export const activatorStyles = StyleSheet.create({
    containerLogo: {
        top: 40
    },
    container: {
        flex: 1,
        top: 120,
        marginHorizontal: 20,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    messageContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center'
    },
    title: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        color: 'black',
        fontSize: 12,
        marginBottom: 10
    },
    inputContainer: {
        margin: 50
    },
    input: {
        color: '#3A3E40',
        fontSize: 30,
        textAlign: 'center',
        backgroundColor: '#F8F7F7',
        borderRadius: 10,
        opacity: 0.7,
        marginBottom: 10
    },
    btnSend: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#3A3E40',
        alignItems: 'center'
    },
    btnSendText:{
        fontSize: 20,
        color: 'white'
    }
});