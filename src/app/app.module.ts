// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { ProtectedRoute1Component } from './components/protected-route1/protected-route1.component';
import { ProtectedRoute2Component } from './components/protected-route2/protected-route2.component';
import { StoreModule } from '@ngrx/store';

import { userReducer } from './store/reducers/user.reducer';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProtectedRoute1Component,
    ProtectedRoute2Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([ // Configure routes here
      { path: 'users', component: UsersComponent },
      { path: 'protected-route1', component: ProtectedRoute1Component },
      { path: 'protected-route2', component: ProtectedRoute2Component },
      { path: '', redirectTo: '/users', pathMatch: 'full' }, // Default redirect
      { path: '**', redirectTo: '/users' } // Redirect unmatched routes
    ]),
    StoreModule.forRoot({ users: userReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
