
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from '../../models/user.model';

export interface UserState  {
  users: User[];
  error: string | null;
}

export const initialState: UserState  = {
  users: [],
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, users })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, error })),
  on(UserActions.addUser, (state, { user }) => ({ ...state, users: [...state.users, user] })),
  on(UserActions.updateUser, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u)
  })),
  on(UserActions.deleteUser, (state, { userId }) => ({
    ...state,
    users: state.users.filter(u => u.id !== userId)
  }))
);
export const getUsers = (state: UserState) => state.users;
export const getError = (state: UserState) => state.error;
