import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRole, UserPermission } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;

  private assumedUserSubject: BehaviorSubject<User | null>;
  public assumedUser$: Observable<User | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>({
      id: 1,
      name: 'Admin User',
      username: 'admin',
      email: 'admin@example.com',
      role: UserRole.Admin,
      permissions: [
        UserPermission.CanCreateUser,
        UserPermission.CanReadUser,
        UserPermission.CanUpdateUser,
        UserPermission.CanDeleteUser,
        UserPermission.CanViewProtectedRoute1,
        UserPermission.CanViewProtectedRoute2,
      ],
    });
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.assumedUserSubject = new BehaviorSubject<User | null>(null);
    this.assumedUser$ = this.assumedUserSubject.asObservable();
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(map((user) => user !== null));
  }

  currentUserRole(): UserRole {
    return this.currentUserSubject.value?.role;
  }

  hasPermission(permission: UserPermission): boolean {
    const user = this.assumedUserSubject.value || this.currentUserSubject.value;
    if (!user) {
      return false; // Handle case where user is not defined
    }
  
    if (user.role === UserRole.Admin) {
      return true; // Admin has all permissions
    } else if (user.role === UserRole.Staff) {
      // Check if permissions array is defined and includes the permission
      return user.permissions !== undefined && user.permissions.includes(permission);
    }
  
    return false;
  }

  assumeUserRole(user: User): void {
    this.assumedUserSubject.next(user);
  }

  clearAssumedUserRole(): void {
    this.assumedUserSubject.next(null);
  }

  getAssumedUser(): Observable<User | null> {
    return this.assumedUser$;
  }
}
