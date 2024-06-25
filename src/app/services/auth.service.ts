import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Example initialization (you might want to initialize with a logged-in user if available)
    // this.currentUserSubject.next(initialUser);
  }

  login(user: User) {
    this.currentUserSubject.next(user);
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === 'Admin' : false;
  }

  assumeRole(userId: number) {
    // Logic to assume role (just for demonstration)
    const assumedUser: User = {
      id: userId,
      username: `user${userId}`, // Example username generation
      email: `user${userId}@gmail.com`, // Example email generation
      name: `User ${userId}`,
      role: 'Staff',
      permissions: [] // Adjust permissions based on your application
    };
    this.currentUserSubject.next(assumedUser);
  }
}
