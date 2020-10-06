import { createReducer, on } from '@ngrx/store';

import { AuthActions } from '../action-types';
import { User } from '../model/user.model';

export const featurekey = 'auth';

export interface AuthState {
    user: User
}

export const initialAuthState: AuthState = {
    user: undefined
}

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.login, (state, action) => ({...state, user: action.user}))
);

