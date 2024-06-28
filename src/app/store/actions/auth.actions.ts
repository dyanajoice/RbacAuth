import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const assumeRole = createAction('[Auth] Assume Role', props<{ user: User }>());
export const clearAssumedRole = createAction('[Auth] Clear Assumed Role');
