import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { User } from '../../models/user.model';

export interface State {
  assumedUser: User | null;
}

export const initialState: State = {
  assumedUser: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.assumeRole, (state, { user }) => ({ ...state, assumedUser: user })),
  on(AuthActions.clearAssumedRole, state => ({ ...state, assumedUser: null }))
);
