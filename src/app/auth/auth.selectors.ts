import { createSelector } from '@ngrx/store';


// Thanks to `createSelector` the operator will have memoization "for free"
export const isLoggedIn = createSelector(
    state => state['auth'],
    (auth) => !!auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    (loggedIn) => !loggedIn
);