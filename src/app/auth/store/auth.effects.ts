import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Router } from "@angular/router";
import { map, tap, switchMap, mergeMap } from "rxjs/operators";

import * as AuthActions from "./auth.actions";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.ofType(AuthActions.TRY_SIGNUP).pipe(
    map((action: AuthActions.TrySignup) => {
      return action.payload;
    }),
    switchMap(
      (authData: {
        username: string;
        password: string;
        name: string;
        surname: string;
        email: string;
      }) => {
        return this.http.post<any>("http://localhost:8080/api/auth/signup", {
          username: authData.username,
          password: authData.password,
          name: authData.name,
          surname: authData.surname,
          email: authData.email,
          returnSecureToken: true
        });
      }
    ),
    mergeMap((data: string) => {
      this.router.navigate(["/signin"]);
      return data;
    })
  );

  @Effect()
  authSignin = this.actions$.ofType(AuthActions.TRY_SIGNIN).pipe(
    map((action: AuthActions.TrySignin) => {
      return action.payload;
    }),
    switchMap((authData: { username: string; password: string }) => {
      return this.http.post<any>("http://localhost:8080/api/auth/signin", {
        username: authData.username,
        password: authData.password,
        returnSecureToken: true
      });
    }),
    switchMap(data => {
      return data.accessToken;
    }),
    mergeMap((token: string) => {
      this.router.navigate(["/"]);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.ofType(AuthActions.LOGOUT).pipe(
    tap(() => {
      this.router.navigate(["/"]);
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private http: HttpClient
  ) {}
}
