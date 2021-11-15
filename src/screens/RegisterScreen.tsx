import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppLogo } from '../components/AppLogo';
import { useForm } from '../hooks/useForm';
import { loginStyles } from '../theme/LoginTheme';
import { BackgroundLogin } from '../components/BackgroundLogin';

interface Props extends StackScreenProps<any, any>{};

export const RegisterScreen = ({ navigation }: Props) => {

    const {name, lastname, email, password, onChangeForm} = useForm({
        name: '',
        lastname: '',
        email: '',
        password: ''
    });

    const onRegister = () => {
        console.log({name, lastname, email, password});
        Keyboard.dismiss();
    }

    return (
        <>  

            <BackgroundLogin />
            <KeyboardAvoidingView 
                style={{flex: 1}}
                behavior={(Platform.OS === 'ios') ? 'padding': 'height'}
            >
                <View style={loginStyles.formContainer}>
                    {/* Logo */}
                    <AppLogo />

                    {/* Title */}
                    <Text style={loginStyles.title}>Registro</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1, marginRight: 5}}>
                            {/* Input name */}
                            <Text style={loginStyles.label}>Nombre</Text>
                            <TextInput
                                placeholder="Ingrese su nombre"
                                placeholderTextColor="#3B688C"
                                underlineColorAndroid="#3B688C"
                                style={loginStyles.inputField}
                                autoCapitalize="words"
                                autoCorrect={false}
                                onChangeText={(value) => onChangeForm(value, 'name')}
                                value={name}
                                onSubmitEditing={onRegister}
                            />
                        </View>

                        <View style={{flex: 1, marginLeft: 5}}>
                            {/* Input lastname */}
                            <Text style={loginStyles.label}>Apellido</Text>
                            <TextInput
                                placeholder="Ingrese su apellido"
                                placeholderTextColor="#3B688C"
                                underlineColorAndroid="#3B688C"
                                style={loginStyles.inputField}
                                autoCapitalize="words"
                                autoCorrect={false}
                                onChangeText={(value) => onChangeForm(value, 'lastname')}
                                value={lastname}
                                onSubmitEditing={onRegister}
                            />
                        </View>
                    </View>

                   

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
                        onSubmitEditing={onRegister}
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
                        onSubmitEditing={onRegister}
                    />
                    
                    {/* Button crear cuenta */}
                    <View style={loginStyles.btnLoginContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.btn}
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.btnText}>Crear</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Regresar al login */}

                    <View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.btnReturn}
                            onPress={() => navigation.replace('LoginScreen')}
                        >
                            <Text style={loginStyles.btnText}>Login</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </KeyboardAvoidingView>
           
        </>
    )
}
