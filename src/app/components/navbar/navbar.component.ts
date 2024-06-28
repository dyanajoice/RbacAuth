import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { selectAllUsers, selectUserError } from '../../store/selectors/user.selectors';
import { UserState } from '../../store/reducers/user.reducer';
import * as UserActions from '../../store/actions/user.actions'; // Import user actions

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  users$: Observable<User[]>;
  error$: Observable<string | null>;

  constructor(private store: Store<UserState>) {
    this.users$ = this.store.pipe(select(selectAllUsers));
    this.error$ = this.store.pipe(select(selectUserError));
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUsers()); // Dispatch action to load users on component initialization
  }

  onAssumeRole(event: any) {
    const selectedUserId = event.target.value; // Assuming you get user ID from the event

    this.users$.subscribe(users => {
      const selectedUser = users.find(user => user.id === selectedUserId);

      if (selectedUser) {
        // Dispatch an action to assume role based on selected user
        this.store.dispatch(UserActions.assumeRole({ user: selectedUser }));
      }
    });
  }

  onClearAssumedRole() {
    // Dispatch an action to clear assumed role
    this.store.dispatch(UserActions.clearAssumedRole());
  }
}
