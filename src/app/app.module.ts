import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { ProtectedRoute1Component } from './components/protected-route1/protected-route1.component';
import { ProtectedRoute2Component } from './components/protected-route2/protected-route2.component';


import { userReducer } from './store/reducers/user.reducer';
import { authReducer } from './store/reducers/auth.reducer';
import { UserEffects } from './store/effects/user.effects';
import { AuthEffects } from './store/effects/auth.effects';

import { AppRoutingModule } from './app-routing.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    ProtectedRoute1Component,
    ProtectedRoute2Component,
    UserFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    StoreModule.forRoot({ users: userReducer, auth: authReducer }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([UserEffects,AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
