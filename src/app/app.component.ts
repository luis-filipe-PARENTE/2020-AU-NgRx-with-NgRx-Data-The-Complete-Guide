import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthActions } from './auth/action-types';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { User } from './auth/model/user.model';
import { AppState } from './state/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedOut$: Observable<boolean>;
    isLoggedIn$: Observable<boolean>;

    constructor(
      private router: Router,
      private store: Store<AppState>
    ) {}

    ngOnInit() {


      // this.store.dispatch(AuthActions.login({user: (JSON.parse(localStorage.getItem('user')))}));


      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      // this.isLoggedIn$ = this.store.pipe(map(state => !!state['auth'].user));
      this.isLoggedIn$ = this.store.select(isLoggedIn);
            
      //this.isLoggedOut$ = this.store.pipe(map(state => !state['auth'].user));
      this.isLoggedOut$ = this.store.select(isLoggedOut);
    }
    
    logout() {
      this.store.dispatch(AuthActions.logout());
    }
}
