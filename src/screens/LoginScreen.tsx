import React, { useContext, useEffect } from 'react';
import { Alert, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppLogo } from '../components/AppLogo';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { loginStyles } from '../theme/LoginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/auth/AuthContext';

interface Props extends StackScreenProps<any, any>{};

export const LoginScreen = ({ navigation }: Props) => {

    const {singIn, removeError, errorMessage, status} = useContext(AuthContext);

    const {email, password, onChangeForm} = useForm({
        email: '',
        password: ''
    });

    const onLogin = () => {
        singIn({email, password});
        Keyboard.dismiss();
    }

    useEffect(() => {
        if (status === 'authenticated') {
            navigation.replace('HomeScreen');
        }
    }, [status]);

    useEffect(() => {
        if (errorMessage.length > 0) {
            Alert.alert(
              'Login incorrecto', 
              errorMessage,
              [
                  {
                      text: 'Ok',
                      onPress: removeError
                  }
              ]
            );
          return;  
        }
    }, [errorMessage])

    return (
        <>  
            {/* Background */}
            <BackgroundLogin />

            <View style={loginStyles.formContainer}>
                {/* Logo */}
                <AppLogo />

                {/* Title */}
                <Text style={loginStyles.title}>Login</Text>

                {/* Input email */}
                <Text style={loginStyles.label}>Correo</Text>
                <TextInput
                    placeholder="Ingrese su email"
                    keyboardType="email-address"
                    placeholderTextColor="#3B688C"
                    underlineColorAndroid="#3B688C"
                    style={loginStyles.inputField}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => onChangeForm(value, 'email')}
                    value={email}
                    onSubmitEditing={onLogin}
                />
                
                {/* Input password */}
                <Text style={loginStyles.label}>Contraseña</Text>
                <TextInput
                    placeholder="**********"
                    placeholderTextColor="#3B688C"
                    underlineColorAndroid="#3B688C"
                    secureTextEntry
                    style={loginStyles.inputField}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => onChangeForm(value, 'password')}
                    value={password}
                    onSubmitEditing={onLogin}
                />
                
                {/* Button login */}
                <View style={loginStyles.btnLoginContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={loginStyles.btn}
                        onPress={onLogin}
                    >
                        <Text style={loginStyles.btnText}>LogIn</Text>
                    </TouchableOpacity>
                </View>

                {/* Link register */}
                <View style={loginStyles.btnRegisterContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={loginStyles.btn}
                        onPress={() => navigation.replace('RegisterScreen')}
                    >
                        <Text style={loginStyles.btnText}>Nueva cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
