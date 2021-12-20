import React, { useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, TextInput, TouchableOpacity, View, Keyboard, StyleSheet } from 'react-native';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { useForm } from '../hooks/useForm';
import { AppLogo } from '../components/AppLogo';
import { AuthContext } from '../context/auth/AuthContext';
import { RootStackParams } from '../router/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'ActivatorScreen'>{};

export const ActivatorScreen = ({navigation}: Props) => {

    const {validationCode, email} = useContext(AuthContext)

    const {code, onChangeForm} = useForm({
        code: ''
    });

    const sendCode = () => {
        console.log({email, code});
        validationCode({email, code});
        Keyboard.dismiss();
    }

    return (
        <>
            <BackgroundLogin />
            <View style={styles.containerLogo}>
                <AppLogo />
            </View>
            <View style={styles.container}>
                <View style={styles.messageContainer}>
                    <View style={styles.inputContainer}>

                        <Text style={styles.title}>Codigo de verificación</Text>
                        <Text style={styles.subtitle}>Se ha enviado un correo a {email} con el codigo de verificación</Text>
                        
                        <TextInput
                            keyboardType="number-pad"
                            maxLength={6}
                            placeholderTextColor="#3B688C"
                            underlineColorAndroid="#3B688C"
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(value) => onChangeForm(value, 'code')}
                            value={code}
                            onSubmitEditing={sendCode}
                        />

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.btnSend}
                            onPress={sendCode}
                        >
                            <Text style={styles.btnSendText}>Validar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </>
    )
}

export const styles = StyleSheet.create({
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
