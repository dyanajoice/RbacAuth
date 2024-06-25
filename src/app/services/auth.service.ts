import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Initialize currentUserSubject with null or an initial user
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  // Method to update currentUserSubject with a logged-in user
  login(user: User) {
    this.currentUserSubject.next(user);
  }

  // Method to check if the current user has the 'Admin' role
  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.role === 'Admin' : false;
  }

  // Method to assume a role (for demonstration purposes)
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
