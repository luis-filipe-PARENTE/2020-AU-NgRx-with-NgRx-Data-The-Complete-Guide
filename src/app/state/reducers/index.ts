import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
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


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
