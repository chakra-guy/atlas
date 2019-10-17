import { of, from } from "rxjs"

import { map, switchMap, catchError, startWith } from "rxjs/operators"
import { ofType } from "../utils/operators$"
import { api } from "../utils"
import { Action, Credentials, User, Action$ } from "../types"

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
    ofType<Action<Credentials>>("LOG_IN"),
    map(({ payload }: any) => ({
      username: payload.username,
      password: payload.password,
    })),
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
