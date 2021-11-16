import { Usuario } from "../../interfaces/AppInterfaces";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'no-authenticated';
    token: string | null;
    errorMessage: string;
    user: Usuario | null;
}

type AuthAction = 
    | {type: 'signUp', payload: {token: string, user: Usuario}}
    | {type: 'addError', payload: string}
    | {type: 'removeError'}
    | {type: 'noAuthenticated'}
    | {type: 'logOut'}


export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                errorMessage: action.payload,
                user: null,
                token: null,
                status: 'no-authenticated'
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
                user: action.payload.user
            }
        
        case 'logOut':
        case 'noAuthenticated':
            return {
                ...state,
                status: 'no-authenticated',
                token: null,
                user: null
            }
    
        default:
            return state;
    }

}