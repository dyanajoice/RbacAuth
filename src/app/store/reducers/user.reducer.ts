import { createReducer, on } from '@ngrx/store';
import { loadUsersSuccess } from '../actions/user.actions';
import { User } from '../../models/user.model';

export interface UserState {
  users: User[];
}

export const initialState: UserState = {
  users: []
};

const _userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users }) => ({ ...state, users }))
);

export function userReducer(state: UserState | undefined, action: any) {
  return _userReducer(state, action);
}
