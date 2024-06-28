// src/app/store/actions/user.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

// Load users from API
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: any }>());

// Add a new user
export const addUser = createAction('[User] Add User', props<{ user: User }>());

// Update an existing user
export const updateUser = createAction('[User] Update User', props<{ user: User }>());

// Delete a user
export const deleteUser = createAction('[User] Delete User', props<{ userId: number }>());
export function assumeRole(arg0: { user: User; }): any {
  throw new Error('Function not implemented.');
}

export function clearAssumedRole(): any {
  throw new Error('Function not implemented.');
}

