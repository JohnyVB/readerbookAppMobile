import React, { useContext } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { activatorStyles } from '../theme/ActivatorTheme';
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
            <View style={activatorStyles.containerLogo}>
                <AppLogo />
            </View>
            <View style={activatorStyles.container}>
                <View style={activatorStyles.messageContainer}>
                    <View style={activatorStyles.inputContainer}>

                        <Text style={activatorStyles.title}>Codigo de verificación</Text>
                        <Text style={activatorStyles.subtitle}>Se ha enviado un correo a {email} con el codigo de verificación</Text>
                        
                        <TextInput
                            keyboardType="number-pad"
                            maxLength={6}
                            placeholderTextColor="#3B688C"
                            underlineColorAndroid="#3B688C"
                            style={activatorStyles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(value) => onChangeForm(value, 'code')}
                            value={code}
                            onSubmitEditing={sendCode}
                        />

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={activatorStyles.btnSend}
                            onPress={sendCode}
                        >
                            <Text style={activatorStyles.btnSendText}>Validar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </>
    )
}
