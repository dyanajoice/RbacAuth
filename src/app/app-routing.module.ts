import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { ProtectedRoute1Component } from './components/protected-route1/protected-route1.component';
import { ProtectedRoute2Component } from './components/protected-route2/protected-route2.component';
import { AuthGuard } from './guards/auth.guard'; // Custom guard for route protection
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';
import { UserRole } from './models/user.model';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users-form', component: UserFormComponent ,canActivate: [AuthGuard],data: { roles: [UserRole.Admin]}},
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'protected-route1', component: ProtectedRoute1Component, canActivate: [AuthGuard] },
  { path: 'protected-route2', component: ProtectedRoute2Component, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login page by default
  { path: '**', redirectTo: '/login' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
