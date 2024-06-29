import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User, UserPermission, UserRole } from '../../models/user.model';
import * as fromUser from '../../store/reducers/user.reducer'; // Adjust import based on your project structure
import * as UserActions from '../../store/actions/user.actions';
import * as UserSelectors from '../../store/selectors/user.selectors';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy  {
  users$: Observable<User[]> | undefined;
  error$: Observable<string | null> | undefined;
 
  showUserForm = false; // Declare showUserForm property
  private usersSubscription: Subscription | undefined;
  selectedUser: User | null = {
    id: 0,
    name: '',
    password: '',
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
    },
    username: '',
    role: UserRole.Admin, // Set role to 'Admin' by default
  };
  
  private errorSubscription: Subscription | undefined;

  constructor(private store: Store<fromUser.UserState>,private authService: AuthService) {}

  ngOnInit(): void {
 

    // Optionally, dispatch an action to load users if needed
    this.store.dispatch(UserActions.loadUsers());
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
    this.error$ = this.store.select(UserSelectors.selectUserError);
        // Subscribe to users$ and error$
        this.usersSubscription = this.users$.subscribe();
        this.errorSubscription = this.error$.subscribe();
  }
  ngOnDestroy(): void {
    // Unsubscribe from users$ and error$ to prevent memory leaks
    this.usersSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
  }
  addUser(user: User) {
    this.store.dispatch(UserActions.addUser({ user }));
  }
  onAddUser(user: User) {
    this.store.dispatch(UserActions.addUser({ user }));
    this.showUserForm = false;
  }
  editUser(user: User) {
    this.selectedUser = { ...user }; 
    this.showUserForm = true; // Create a copy of user for editing
  }
  canCreateUser(): boolean {
    return this.authService.hasPermission(UserPermission.CanCreateUser);
  }

  canReadUser(): boolean {
    return this.authService.hasPermission(UserPermission.CanReadUser);
  }

  canUpdateUser(): boolean {
    return this.authService.hasPermission(UserPermission.CanUpdateUser);
  }

  canDeleteUser(): boolean {
    return this.authService.hasPermission(UserPermission.CanDeleteUser);
  }

  canViewProtectedRoute1(): boolean {
    return this.authService.hasPermission(UserPermission.CanViewProtectedRoute1);
  }

  canViewProtectedRoute2(): boolean {
    return this.authService.hasPermission(UserPermission.CanViewProtectedRoute2);
  }
  closeModal() {
    this.showUserForm = false; // Close the modal form
  }

  saveUserChanges(updatedUser: User) {
    this.store.dispatch(UserActions.updateUser({ user: updatedUser }));
    this.selectedUser = null; // Clear selected user after update
  }

  deleteUser(userId: number) {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

}



