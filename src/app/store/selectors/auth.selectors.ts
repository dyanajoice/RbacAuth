import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<State>('auth');

export const selectAssumedUser = createSelector(
  selectAuthState,
  (state: State) => state.assumedUser
);
