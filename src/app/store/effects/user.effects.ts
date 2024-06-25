import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { UserService } from '../../services/user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from '../actions/user.actions';
import { User } from 'src/app/models/user.model';

@Injectable()
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(() =>
        this.userService.fetchUsers().pipe(
          map((users: User[]) => loadUsersSuccess({ users })), 
          catchError(error => of(loadUsersFailure({ error }))) 
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
