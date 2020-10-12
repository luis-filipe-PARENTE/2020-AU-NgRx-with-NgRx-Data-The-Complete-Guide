import { Injectable } from '@angular/core';
import { Actions, createEffect, EffectNotification, ofType, OnRunEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { exhaustMap, map, takeUntil, tap, delay } from 'rxjs/operators';
import { AuthActions } from '../auth/action-types'

import { AppActions } from './actions-types';
import { AppState } from './reducers';


@Injectable() 
export class LoaderEffect implements OnRunEffects {

    login$ = createEffect(() => this.actions$
    .pipe(
        ofType(AppActions.CheckAppLocalStorage),
        map(_ => {
            // this.store.dispatch(AuthActions.login({user: (JSON.parse(localStorage.getItem('user')) || {}) as User }))
            return AuthActions.login({user: (JSON.parse(localStorage.getItem('user')))});
        })
    ));


    ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
        return this.actions$
            .pipe(
                ofType(AppActions.StartAppInitializer),
                exhaustMap(()=> resolvedEffects$.pipe(
                    takeUntil(this.actions$.pipe(
                        ofType(AppActions.FinishAppInitializer)
                    ))
                ))
            )
    }

    constructor(public actions$: Actions, private store: Store<AppState>){}

}