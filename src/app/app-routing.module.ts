import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { ProtectedRoute1Component } from './components/protected-route1/protected-route1.component';
import { ProtectedRoute2Component } from './components/protected-route2/protected-route2.component';
import { AuthGuard } from './guards/auth.guard'; // Custom guard for route protection
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
 
  { path: 'users', component: UsersComponent },
  { path: 'users-form', component: UserFormComponent },
  { path: 'protected-route1', component: ProtectedRoute1Component},
  { path: 'protected-route2', component: ProtectedRoute2Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
