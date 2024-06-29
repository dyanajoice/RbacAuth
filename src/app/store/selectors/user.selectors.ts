import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';

// Select the feature state (UserState)
export const selectUserState = createFeatureSelector<UserState>('users');

// Select the 'users' array from the UserState
export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state ? state.users : []
);
// Select the 'error' string from the UserState
export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
