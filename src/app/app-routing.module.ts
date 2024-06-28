import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { ProtectedRoute1Component } from './components/protected-route1/protected-route1.component';
import { ProtectedRoute2Component } from './components/protected-route2/protected-route2.component';
import { AuthGuard } from './guards/auth.guard'; // Custom guard for route protection

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'protected-route1', component: ProtectedRoute1Component, canActivate: [AuthGuard] },
  { path: 'protected-route2', component: ProtectedRoute2Component, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
