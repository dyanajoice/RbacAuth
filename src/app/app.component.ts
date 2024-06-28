import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from './store/actions/user.actions';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'rbac-app';

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    // Load initial user data from the API
    this.store.dispatch(loadUsers());
  }
}
