import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
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
  ],

  declarations: [
    LoginComponent
  ],

  exports: [
    LoginComponent
  ]
})
export class AuthModule {}
