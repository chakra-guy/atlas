import { switchMap, catchError } from "rxjs/operators"
import { from, of } from "rxjs"
import { ofType } from "./operators"
import { api } from "../_lib"

export const changeName = (payload: any): any => ({
  type: "NAME_CHANGED",
  payload,
})

export const fetchGithubFollowers = (payload: any): any => ({
  type: "FETCH_GITHUB",
  payload,
})

export const fetchGithubFollowersSuccess = (payload: any): any => ({
  type: "FETCH_GITHUB_FOLLOWERS_SUCCESS",
  payload,
})

export const fetchGithubFollowersError = (payload: any): any => ({
  type: "FETCH_GITHUB_FOLLOWERS_ERROR",
  payload,
})

export const fetchGithubFollowersStream = (action$: any) => {
  return action$.pipe(
    ofType<any>("FETCH_GITHUB"),
    switchMap(() =>
      from(api.get("https://api.github.com/users?per_page=5")).pipe(
        switchMap((res: any): any =>
          of(changeName("success tamas"), fetchGithubFollowersSuccess(res)),
        ),
        catchError((err: any): any => of(fetchGithubFollowersError("error tomi"))),
      ),
    ),
  )
}
