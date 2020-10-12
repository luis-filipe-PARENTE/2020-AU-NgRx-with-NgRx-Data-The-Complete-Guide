import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Inject, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule, Routes } from '@angular/router';
import { ReactiveComponentModule } from '@ngrx/component';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { filter, take, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthGuardService } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { selectAuthState } from './auth/auth.selectors';
import { User } from './auth/model/user.model';
import { AuthState } from './auth/reducers';
import { AppActions } from './state/actions-types';
import { LoaderEffect } from './state/app.loader.effect';
import { AppState, metaReducers, reducers } from './state/reducers';

export function initApplication(store: Store<AuthState>, router: Router): Function {
  
  return () => new Promise(resolve => {
    store.dispatch(AppActions.StartAppInitializer());
    store.dispatch(AppActions.CheckAppLocalStorage());
    
    store.select(selectAuthState).pipe(
      // tap((user) =>  console.log(`[ AppModule::initApplication::tap ] ${JSON.stringify(user)}`)),
      // tap((user) =>  console.log(`[ AppModule::initApplication::tap ] ${user}`)),
      filter(user => user !== undefined),
      take(1)
    ).subscribe((auth) => {
      console.log('this is the user connected!', auth.user);
      store.dispatch(AppActions.FinishAppInitializer());
      resolve(true);
    });
  })

}

const routes: Routes = [
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canLoad: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule/*.forRoot()*/,
    ReactiveComponentModule,
    StoreModule.forRoot(reducers, { 
      metaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true
      }, 
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([LoaderEffect]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER, 
      useFactory: initApplication,
      multi: true,
      deps: [
        [new Inject(Store)],
        [new Inject(Router)]
      ]

    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
