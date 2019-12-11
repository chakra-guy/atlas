import { of, from } from "rxjs"

import { switchMap, catchError, startWith, pluck } from "rxjs/operators"
import { ofType } from "../utils/operators$"
import { api } from "../utils"
import { Action, Credentials, User, Action$ } from "../types"

export const signup = (payload: Credentials) => ({
  type: "SIGN_UP",
  payload,
})

export const signupStart = () => ({
  type: "SIGN_UP_START",
})

export const signupSuccess = (payload: { user: User; token: string }) => ({
  type: "SIGN_UP_SUCCESS",
  payload,
})

export const signupFailed = (payload: string) => ({
  type: "SIGN_UP_FAILED",
  payload,
})

export const signupEpic = (action$: Action$) => {
  return action$.pipe(
    ofType<Action<any>>("SIGN_UP"),
    pluck("payload"),
    switchMap((params: Credentials) =>
      from(api.post("/signup", params)).pipe(
        switchMap(({ data, meta }: any) => {
          const payload = { user: data, token: meta.token }

          localStorage.setItem("atlas-auth", JSON.stringify(payload))

          return of(signupSuccess(payload))
        }),
        catchError(error => of(signupFailed(error))),
        startWith(signupStart()),
      ),
    ),
  )
}

export const login = (payload: Credentials) => ({
  type: "LOG_IN",
  payload,
})

export const loginStart = () => ({
  type: "LOG_IN_START",
})

export const loginSuccess = (payload: { user: User; token: string }) => ({
  type: "LOG_IN_SUCCESS",
  payload,
})

export const loginFailed = (payload: string) => ({
  type: "LOG_IN_FAILED",
  payload,
})

export const loginEpic = (action$: Action$) => {
  return action$.pipe(
    ofType<Action<any>>("LOG_IN"),
    pluck("payload"),
    switchMap((params: Credentials) =>
      from(api.post("/login", params)).pipe(
        switchMap(({ data, meta }: any) => {
          const payload = { user: data, token: meta.token }

          localStorage.setItem("atlas-auth", JSON.stringify(payload))

          return of(loginSuccess(payload))
        }),
        catchError(error => of(loginFailed(error))),
        startWith(loginStart()),
      ),
    ),
  )
}
