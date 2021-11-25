import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import lectorApi from '../../api/lectorApi';
import { Usuario, PropsProvider, UserResponse, LoginData, RegisterData, ValidateData } from '../../interfaces/AppInterfaces';
import { AuthReducer, AuthState } from './AuthReducer';
import { Alert } from 'react-native';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'no-authenticated' | 'activation';
    email: string;
    singIn: (loginData: LoginData) => void;
    singUp: (registerData: RegisterData) => void;
    logOut: () => void;
    removeError: () => void;
    validationCode: (validateData: ValidateData) => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',
    email: ''
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: PropsProvider) => {

    const [state, dispatch] = useReducer(AuthReducer, authInicialState);

    useEffect(() => {
        getToken();
    }, []);

    const getToken = async() => {
        
        try {

            const token = await AsyncStorage.getItem('x-token');
            
            if (!token){
                return dispatch({type:'noAuthenticated'});
            }

            const {data, status} = await lectorApi.get<UserResponse>('/auth/renewtoken');            

            if (status !== 200) {
                return dispatch({type: 'noAuthenticated'});
            }
    
            await AsyncStorage.setItem('x-token', data.token);
    
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

        } catch (error: any) {
            console.log(error);
            console.log(error?.response?.data?.msg);
            await AsyncStorage.clear();
            dispatch({type: 'noAuthenticated'});
        }
        
    }

    const singIn = async({email, password}: LoginData) => {
        try {
            const {data} = await lectorApi.post<UserResponse>('/auth/login', {email, password});

            if (data.usuario.validatorNumber) {
                return dispatch({
                    type: 'activation',
                    payload: {
                        email: data.usuario.email
                    }
                });
            }

            if (!data.usuario.state) {
                return dispatch({
                    type: 'noAuthenticated'
                });
            }
            
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            await AsyncStorage.setItem('x-token', data.token);
            
        } catch (error: any) {
            console.log(error);            
            console.log(error?.response?.data?.msg);
            dispatch({
                type: 'addError',
                payload: 'Información incorrecta'
            });  
        }
    };

    const singUp = async ({name, lastname, email, password}: RegisterData) => {
        
        try {

            const {data} = await lectorApi.post('/users', {name, lastname, email, password});
            dispatch({
                type: 'activation',
                payload: {
                    email: data.usuario.email
                }
            });

        } catch (error: any) {
            console.log(error);            
            console.log(error?.response?.data?.msg);
        }
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('x-token');
        dispatch({type: 'logOut'});
    };

    const removeError = () => {
        dispatch({type: 'removeError'});
    };

    const validationCode = async ({email, code}: ValidateData) => {
        try {
            
            const {data} = await lectorApi.put<UserResponse>('/auth/activateuser', {email, code});

            dispatch({
                type: 'signUp',
                payload: {
                    user: data.usuario,
                    token: data.token
                }
            });

            await AsyncStorage.setItem('x-token', data.token);

        } catch (error: any) {
            console.log(error);            
            console.log(error?.response?.data?.msg);
            Alert.alert('Error al validar el codigo', error?.response?.data?.msg);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                singUp,
                singIn,
                logOut,
                removeError,
                validationCode
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}