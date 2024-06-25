import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersComponent } from './components/users/users.component';
import { ProtectedRoute1Component } from './components/protected-route1/protected-route1.component';
import { ProtectedRoute2Component } from './components/protected-route2/protected-route2.component';


import { userReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effects';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersComponent,
    ProtectedRoute1Component,
    ProtectedRoute2Component
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  //   StoreModule.forRoot({ users: userReducer }),
  //   EffectsModule.forRoot([UserEffects]),
  //   StoreDevtoolsModule.instrument({ maxAge: 25 })
   ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
