// auth.guard.ts

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          const userRole = this.authService.getCurrentUser()?.role;

          // Ensure userRole is defined before checking against required roles
          if (!userRole) {
            // Handle case where user role is undefined
            this.router.navigate(['/login']);
            return false;
          }

          // Check if the route requires specific roles
          const requiredRoles = next.data.roles as UserRole[];
          if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.includes(userRole)) {
            // Redirect to unauthorized page or handle unauthorized access
            this.router.navigate(['/unauthorized']);
            return false;
          }

          return true; // User is authenticated and has required role
        } else {
          this.router.navigate(['/login']);
          return false; // User is not authenticated
        }
      })
    );
  }
}
