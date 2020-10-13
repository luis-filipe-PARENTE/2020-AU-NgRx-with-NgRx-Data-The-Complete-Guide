import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,


  MetaReducer
} from '@ngrx/store';
import { AuthState } from 'app/auth/reducers';
import { environment } from '../../../environments/environment';

// tslint:disable-next-line: no-empty-interface
export interface AppState {
  auth: AuthState,
  router: RouterReducerState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: undefined,
  router: routerReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action', action);

    return reducer(state, action);
  }
}


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [logger] : [];
