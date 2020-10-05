import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import * as fromAuth from './reducers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent }]),
    StoreModule.forFeature(fromAuth.featurekey, fromAuth.reducers, {}),
  ],

  declarations: [
    LoginComponent
  ],

  exports: [
    LoginComponent
  ]
})
export class AuthModule {
  // static forRoot(): ModuleWithProviders<AuthModule> {
  //   return {
  //     ngModule: AuthModule,
  //     providers: [
  //       AuthService
  //     ]
  //   };
  // }
}
