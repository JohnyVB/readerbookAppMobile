import React, { useContext, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator, Alert, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppLogo } from '../components/AppLogo';
import { useForm } from '../hooks/useForm';
import { BackgroundLogin } from '../components/BackgroundLogin';
import { AuthContext } from '../context/auth/AuthContext';
import { RootStackParams } from '../router/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{};

export const RegisterScreen = ({ navigation }: Props) => {

    const [isCreating, setIsCreating] = useState(false);

    const {singUp, status} = useContext(AuthContext);

    const {name, lastname, email, password, cpassword, onChangeForm} = useForm({
        name: '',
        lastname: '',
        email: '',
        password: '',
        cpassword: ''
    });

    const onRegister = () => {
        setIsCreating(true);
        if (password !== cpassword) {
            Alert.alert(
                'Error con las contraseñas',
                'Las contraseñas no coinciden, por favor verificar'
            );
            Keyboard.dismiss();
            setIsCreating(false);
        }else{
            singUp({name, lastname, email, password});
            Keyboard.dismiss();
            if (status !== 'activation' && status !== 'authenticated') {
                setIsCreating(false);
            }
        }
        // console.log({name, lastname, email, password});
    }

    return (
        <>  

            <BackgroundLogin />
            <KeyboardAvoidingView 
                style={{flex: 1}}
                behavior={(Platform.OS === 'ios') ? 'padding': 'height'}
            >
                <View style={styles.formContainer}>
                    {/* Logo */}
                    <AppLogo />

                    {/* Title */}
                    <View style={styles.containerTitle}>
                        <Text style={styles.title}>Registro</Text>
                    </View>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flex: 1, marginRight: 5}}>
                            {/* Input name */}
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput
                                placeholder="Ingrese su nombre"
                                placeholderTextColor="#3B688C"
                                underlineColorAndroid="#3B688C"
                                style={styles.inputField}
                                autoCapitalize="words"
                                autoCorrect={false}
                                onChangeText={(value) => onChangeForm(value, 'name')}
                                value={name}
                                onSubmitEditing={onRegister}
                            />
                        </View>

                        <View style={{flex: 1, marginLeft: 5}}>
                            {/* Input lastname */}
                            <Text style={styles.label}>Apellido</Text>
                            <TextInput
                                placeholder="Ingrese su apellido"
                                placeholderTextColor="#3B688C"
                                underlineColorAndroid="#3B688C"
                                style={styles.inputField}
                                autoCapitalize="words"
                                autoCorrect={false}
                                onChangeText={(value) => onChangeForm(value, 'lastname')}
                                value={lastname}
                                onSubmitEditing={onRegister}
                            />
                        </View>
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
                        onSubmitEditing={onRegister}
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
                        onSubmitEditing={onRegister}
                    />

                    {/* Confirm password */}
                    <Text style={styles.label}>Confirmar contraseña</Text>
                    <TextInput
                        placeholder="**********"
                        placeholderTextColor="#3B688C"
                        underlineColorAndroid="#3B688C"
                        secureTextEntry
                        style={styles.inputField}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={(value) => onChangeForm(value, 'cpassword')}
                        value={cpassword}
                        onSubmitEditing={onRegister}
                    />
                    
                    {/* Button crear cuenta y cancelar */}
                    <View style={styles.btnLoginContainer}>
                        <TouchableOpacity
                            // disabled={true}
                            activeOpacity={0.8}
                            style={styles.btn}
                            onPress={onRegister}
                        >
                            {
                                (isCreating)
                                    ? <ActivityIndicator size={20} color="white" />
                                    : <Text style={styles.btnText}>Crear</Text>
                                    
                            }
                            
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.btnReturn}
                            onPress={() => navigation.replace('LoginScreen')}
                        >
                            <Text style={styles.btnText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                 

                </View>
            </KeyboardAvoidingView>
           
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
