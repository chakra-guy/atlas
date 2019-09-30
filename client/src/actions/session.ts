import { of, from } from "rxjs"

import { map, switchMap, catchError, startWith } from "rxjs/operators"
import { ofType } from "../__prototype/operators"
import { api } from "../utils"

export const login = (payload: any) => ({
  type: "LOG_IN",
  payload,
})

export const loginStart = () => ({
  type: "LOG_IN_START",
})

export const loginSuccess = (payload: any) => ({
  type: "LOG_IN_SUCCESS",
  payload,
})

export const loginFailed = (payload: any) => ({
  type: "LOG_IN_FAILED",
  payload,
})

export const loginEpic = (action$: any) => {
  return action$.pipe(
    ofType<any>("LOG_IN"),
    map(({ payload }: any) => ({
      username: payload.username,
      password: payload.password,
    })),
    switchMap((params: any) =>
      from(api.post("/login", params)).pipe(
        switchMap(({ data, meta }: any) => {
          const payload = { user: data, token: meta.token }

          localStorage.setItem("token", JSON.stringify(payload))

          return of(loginSuccess(payload))
        }),
        catchError(error => of(loginFailed(error))),
        startWith(loginStart()),
      ),
    ),
  )
}
