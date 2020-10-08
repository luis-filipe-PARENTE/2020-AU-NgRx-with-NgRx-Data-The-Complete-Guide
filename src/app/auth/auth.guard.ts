import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'app/reducers';
import { noop, Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
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
            
            return this.store
            .pipe(
                select(isLoggedIn),
                tap(loggedIn => console.log(`[ canLoad ] value of loggedIn ==> ${loggedIn}`)),
                tap(loggedIn => {
                    if(!loggedIn) {
                        this.router.navigateByUrl('/login'); 
                    }
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