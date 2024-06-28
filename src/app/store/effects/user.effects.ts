// src/app/store/effects/user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as UserActions from '../actions/user.actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {

  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.loadUsers),
    switchMap(() => this.userService.getUsers()
      .pipe(
        map(users => UserActions.loadUsersSuccess({ users })),
        catchError(error => of(UserActions.loadUsersFailure({ error })))
      ))
    )
  );

  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.addUser),
    switchMap(({ user }) => this.userService.addUser(user)
      .pipe(
        map(() => UserActions.loadUsers()), // Reload users after adding
        catchError(error => of(UserActions.loadUsersFailure({ error })))
      ))
    )
  );

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUser),
    switchMap(({ user }) => this.userService.updateUser(user)
      .pipe(
        map(() => UserActions.loadUsers()), // Reload users after updating
        catchError(error => of(UserActions.loadUsersFailure({ error })))
      ))
    )
  );

  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.deleteUser),
    switchMap(({ userId }) => this.userService.deleteUser(userId)
      .pipe(
        map(() => UserActions.loadUsers()), // Reload users after deleting
        catchError(error => of(UserActions.loadUsersFailure({ error })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
