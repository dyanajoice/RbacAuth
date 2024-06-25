import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.currentUser$.pipe(
      take(1), // Take only one emission to get the current user
      map(user => {
        if (!user) {
          // Redirect to login or any other route if user is not authenticated
          return this.router.createUrlTree(['/login']);
        }

        const url = state.url;
        if (url.includes('protected-route1')) {
          return user.permissions.includes('CanViewProtectedRoute1');
        }

        if (url.includes('protected-route2')) {
          return user.permissions.includes('CanViewProtectedRoute2');
        }

        // Default to true for unrestricted routes
        return true;
      })
    );
  }
}
