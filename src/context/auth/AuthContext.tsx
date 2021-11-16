import React, {createContext, useReducer} from 'react';
import { Usuario, PropsProvider } from '../../interfaces/AppInterfaces';
import { AuthReducer, AuthState } from './AuthReducer';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'no-authenticated';
    singUp: () => void;
    singIn: () => void;
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

    const singUp = () => {};
    const singIn = () => {};
    const logOut = () => {};
    const removeError = () => {};

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