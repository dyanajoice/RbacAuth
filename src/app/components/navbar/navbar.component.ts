import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { selectAllUsers, selectUserError } from '../../store/selectors/user.selectors';
import { UserState } from '../../store/reducers/user.reducer';
import * as UserActions from '../../store/actions/user.actions'; // Import user actions
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  users$: Observable<User[]>;
  error$: Observable<string | null>;
  showAssumeRole: boolean = false;
  roleAssumptionNotification: string | null = null;

  constructor(private store: Store<UserState>,private authService: AuthService, private router: Router) {
    this.users$ = this.store.pipe(select(selectAllUsers));
    this.error$ = this.store.pipe(select(selectUserError));
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers()); // Dispatch action to load users on component initialization
  }

  onAssumeRoleToggle() {
    this.showAssumeRole = !this.showAssumeRole;
  }

  onAssumeRole(user: User) {
    // Dispatch an action to assume role based on selected user
    this.store.dispatch(UserActions.assumeRole({ user }));

    // Update notification
    this.roleAssumptionNotification = `Admin has assumed the role of ${user.name}`;

    // Hide role assumption dropdown after assumption
    this.showAssumeRole = false;
  }
 
  logout(): void {
    this.authService.setCurrentUser(null); // Clear the current user in AuthService
    this.router.navigate(['/login']); // Navigate to the login page
  }

  onClearAssumedRole() {
    // Dispatch an action to clear assumed role
    this.store.dispatch(UserActions.clearAssumedRole());

    // Clear notification
    this.roleAssumptionNotification = null;
  }
}
