import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

    constructor(
        private action$: Actions
    ) {
        this.action$.pipe(
            tap(
                action => {
                    if(action.type === '[Login Page] User Login') {
                        localStorage.setItem('user', JSON.stringify(action['user']));
                    }
                }
            )
        ).subscribe();
    }
}