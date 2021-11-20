import React, {createContext, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import lectorApi from '../../api/lectorApi';
import { Usuario, PropsProvider, UserResponse, LoginData } from '../../interfaces/AppInterfaces';
import { AuthReducer, AuthState } from './AuthReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'no-authenticated';
    singIn: (loginData: LoginData) => void;
    singUp: () => void;
    logOut: () => void;
    removeError: () => void;
}

const authInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: ''
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
            console.log(error.response.data.msg);
            if (error.response.data.msg === 'jwt expired') {
                await AsyncStorage.clear(); //Elimina el token vencido
            }
            dispatch({type: 'noAuthenticated'});
        }
        
    }

    const singIn = async({email, password}: LoginData) => {
        try {
            const {data} = await lectorApi.post<UserResponse>('/auth/login', {email, password});
            dispatch({
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.usuario
                }
            });

            await AsyncStorage.setItem('x-token', data.token);

        } catch (error: any) {            
            console.log(error.response.data.msg);
            dispatch({
                type: 'addError',
                payload: error.response.data.msg || 'Información incorrecta'
            });  
        }
    };

    const singUp = () => {};
    const logOut = () => {};
    const removeError = () => {
        dispatch({type: 'removeError'});
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                singUp,
                singIn,
                logOut,
                removeError
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}