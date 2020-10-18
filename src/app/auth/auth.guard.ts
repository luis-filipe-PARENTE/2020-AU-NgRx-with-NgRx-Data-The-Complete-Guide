import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/state/reducers';
import { noop, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { isLoggedIn } from './auth.selectors';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

    constructor(
        private store: Store<AppState>,
        private router: Router
    ){}
   
    canLoad(
        route: Route, 
        segments: UrlSegment[]): Observable<boolean> {

            console.log(this.store);

            return this.store
            .pipe(
                select(isLoggedIn),
                tap(loggedIn => console.log(`[ canActivate ] value of loggedIn ==> ${loggedIn}`)),
                tap(loggedIn => {
                    !loggedIn ? this.router.navigateByUrl('/login') : noop(); 
                }),
                take(1)

            );     
        }
    
    canActivate(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Observable<boolean> {
        
         return this.store
                .pipe(
                    select(isLoggedIn),
                    tap(loggedIn => console.log(`[ canActivate ] value of loggedIn ==> ${loggedIn}`)),
                    tap(loggedIn => {
                        !loggedIn ? this.router.navigateByUrl('/login') : noop(); 
                    })

                );
   }
}