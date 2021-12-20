import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppLogo } from '../components/AppLogo';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/auth/AuthContext';
import { RootStackParams } from '../router/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{};

export const LoginScreen = ({ navigation }: Props) => {

    const {singIn, removeError, errorMessage} = useContext(AuthContext);

    const [isLogin, setIsLogin] = useState<boolean>(false);

    const {email, password, onChangeForm} = useForm({
        email: '',
        password: ''
    });

    const onLogin = () => {
        setIsLogin(true);
        if (!email || !password) {
            return Alert.alert(
            'Campos vacios', 
              'Por favor ingrese sus datos completos',
              [
                  {
                      text: 'Ok',
                      onPress: removeError
                  }
              ]
            );
        }

        singIn({email, password});
        Keyboard.dismiss();
    }

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
            return setIsLogin(false);
        }
    }, [errorMessage])

    return (
        <>  
            {/* Background */}
            <BackgroundLogin />

            <View style={styles.formContainer}>
                {/* Logo */}
                <AppLogo />

                {/* Title */}
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Login</Text>
                </View>

                {/* Input email */}
                <Text style={styles.label}>Correo</Text>
                <TextInput
                    placeholder="Ingrese su email"
                    keyboardType="email-address"
                    placeholderTextColor="#3B688C"
                    underlineColorAndroid="#3B688C"
                    style={styles.inputField}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => onChangeForm(value, 'email')}
                    value={email}
                    onSubmitEditing={onLogin}
                />
                
                {/* Input password */}
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    placeholder="**********"
                    placeholderTextColor="#3B688C"
                    underlineColorAndroid="#3B688C"
                    secureTextEntry
                    style={styles.inputField}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(value) => onChangeForm(value, 'password')}
                    value={password}
                    onSubmitEditing={onLogin}
                />
                
                {/* Button login and register */}
                <View style={styles.btnLoginContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btn}
                        onPress={onLogin}
                        disabled={errorMessage.length > 0}
                    >
                        {
                            (!isLogin)
                                ? <Text style={styles.btnText}>Ingresar</Text>
                                : <ActivityIndicator color="white" style={styles.activity} size={20} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnNew}
                        onPress={() => navigation.replace('RegisterScreen')}
                    >
                        <Text style={styles.btnText}>Nueva cuenta</Text>
                    </TouchableOpacity>
                </View>

                {/* Link register */}
                <View style={styles.btnRegisterContainer}>
                    
                </View>
            </View>
        </>
    )
}

export const styles = StyleSheet.create({
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
    activity : {
        marginHorizontal: 20,
        marginVertical: 4
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
