import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthEffects {
  assumeRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.assumeRole),
      tap(action => this.authService.assumeUserRole(action.user))
    ),
    { dispatch: false }
  );

  clearAssumedRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.clearAssumedRole),
      tap(() => this.authService.clearAssumedUserRole())
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
