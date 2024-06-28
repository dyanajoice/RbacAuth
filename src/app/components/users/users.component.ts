import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import * as fromUser from '../../store/reducers/user.reducer'; // Adjust import based on your project structure
import * as UserActions from '../../store/actions/user.actions';
import * as UserSelectors from '../../store/selectors/user.selectors';


@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  error$: Observable<string | null> | undefined;
  selectedUser: User | null | undefined; 
  constructor(private store: Store<fromUser.UserState>) {}

  ngOnInit(): void {
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
    this.error$ = this.store.select(UserSelectors.selectUserError);

    // Optionally, dispatch an action to load users if needed
    this.store.dispatch(UserActions.loadUsers());
  }
  addUser(user: User) {
    this.store.dispatch(UserActions.addUser({ user }));
  }

  editUser(user: User) {
    this.selectedUser = { ...user }; // Create a copy of user for editing
  }

  saveUserChanges(updatedUser: User) {
    this.store.dispatch(UserActions.updateUser({ user: updatedUser }));
    this.selectedUser = null; // Clear selected user after update
  }

  deleteUser(userId: number) {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }
}
