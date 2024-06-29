import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserPermission, UserRole } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private assumedUserSubject: BehaviorSubject<User | null>;
  public assumedUser$: Observable<User | null>;
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      username: 'admin',
      password: 'password1',
      role: UserRole.Admin,
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      username: 'staff',
      password: 'password2',
      role: UserRole.Staff,
      permissions: [
        UserPermission.CanViewProtectedRoute2
      ],
      email: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    }
    // Add more users as needed
  ];

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.assumedUserSubject = new BehaviorSubject<User | null>(null);
    this.assumedUser$ = this.assumedUserSubject.asObservable();
    // Initialize with the user stored in localStorage if available
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<any> {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return new Observable(observer => {
        observer.next(user);
        observer.complete();
      });
    } else {
      return new Observable(observer => {
        observer.error(new Error('Invalid credentials'));
      });
    }
  }
  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
  }
  logout(): void {
    this.currentUserSubject.next(null); // Clear current user
  }
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(map((user) => user !== null));
  }
  

  currentUserRole(): UserRole | undefined {
    return this.getCurrentUser()?.role;
  }
  assumeUserRole(user: User): void {
    this.assumedUserSubject.next(user);
  }

  clearAssumedUserRole(): void {
    this.assumedUserSubject.next(null);
  }
  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user) {
      return false;
    }

    // Adjust logic to check permissions based on user role
    if (user.role === UserRole.Admin) {
      return true; // Admin has all permissions
    } else if (user.role === UserRole.Staff) {
      // Example: Conditional permission check based on user's role
      return permission === 'CanViewProtectedRoute1' || permission === 'CanViewProtectedRoute2';
    }

    return false;
  }
}
