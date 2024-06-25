import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AppState } from '../../store/app.state';
import { loadUsers } from '../../store/actions/user.actions';
import { selectAllUsers } from '../../store/selectors/user.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>; // Ensure Observable<User[]> is imported from 'rxjs'

  constructor(private store: Store<AppState>) {
    this.users$ = new Observable<User[]>(); // Initialize users$ with an empty observable
  }

  ngOnInit() {
    this.store.dispatch(loadUsers());
    this.users$ = this.store.select(selectAllUsers); // Assign the selected users to users$
  }
}
