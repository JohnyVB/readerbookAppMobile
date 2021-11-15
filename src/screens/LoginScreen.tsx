import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppLogo } from '../components/AppLogo';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { loginStyles } from '../theme/LoginTheme';

export const LoginScreen = () => {
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
                <Text style={loginStyles.label}>Email</Text>
                <TextInput
                    placeholder="Ingrese su email"
                    keyboardType="email-address"
                    placeholderTextColor="#3B688C"
                    underlineColorAndroid="#3B688C"
                    style={loginStyles.inputField}
                    autoCapitalize="none"
                    autoCorrect={false}
                    //TODO: onchage, value
                />
                
                {/* Input password */}
                <Text style={loginStyles.label}>Password</Text>
                <TextInput
                    placeholder="**********"
                    placeholderTextColor="#3B688C"
                    underlineColorAndroid="#3B688C"
                    style={loginStyles.inputField}
                    autoCapitalize="none"
                    autoCorrect={false}
                    //TODO: onchage, value
                />
                
                {/* Button login */}
                <View style={loginStyles.btnLoginContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={loginStyles.btn}
                    >
                        <Text style={loginStyles.btnText}>Login</Text>
                    </TouchableOpacity>
                </View>

                {/* Link register */}
                <View style={loginStyles.btnRegisterContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={loginStyles.btn}
                    >
                        <Text style={loginStyles.btnText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
