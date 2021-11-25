import { Usuario } from "../../interfaces/AppInterfaces";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'no-authenticated' | 'activation';
    token: string | null;
    errorMessage: string;
    user: Usuario | null;
    email: string;
}

type AuthAction = 
    | {type: 'signUp', payload: {token: string, user: Usuario}}
    | {type: 'addError', payload: string}
    | {type: 'removeError'}
    | {type: 'noAuthenticated'}
    | {type: 'logOut'}
    | {type: 'activation', payload: {email: string}}


export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                errorMessage: action.payload,
                user: null,
                token: null,
                status: 'no-authenticated',
                email: ''
            }

        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }

        case 'signUp':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token,
                user: action.payload.user,
                email: ''
            }
        
        case 'logOut':
        case 'noAuthenticated':
            return {
                ...state,
                status: 'no-authenticated',
                token: null,
                user: null,
                email: ''
            }

        case 'activation':
            return {
                ...state,
                status: 'activation',
                token: null,
                user: null,
                email: action.payload.email
            }
    
        default:
            return state;
    }

}