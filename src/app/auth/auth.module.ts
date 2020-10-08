import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';
import { LoginComponent } from './login/login.component';
import * as fromAuth from './reducers';
import { authReducer } from './reducers';

const ROUTES: Routes = [
  { path: '', 
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature(fromAuth.featurekey, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],

  declarations: [
    LoginComponent
  ],

  exports: [
    LoginComponent
  ]
})
export class AuthModule {}
