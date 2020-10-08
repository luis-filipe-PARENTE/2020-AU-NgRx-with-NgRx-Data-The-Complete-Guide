import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';

// it's type safe away to access to the auth property of state better than state['auth']
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Thanks to `createSelector` the operator will have memoization "for free"
export const isLoggedIn = createSelector(
    selectAuthState,
    (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn) => !loggedIn
);