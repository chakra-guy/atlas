import { flatMap, switchMap, tap, catchError } from "rxjs/operators"
import { fromFetch } from "rxjs/fetch"
import { from, of } from "rxjs"
import { ofType } from "./operators"
import { dispatch } from "./action$"

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
    flatMap(() =>
      fromFetch("https://api.github.com/users?per_page=5").pipe(
        switchMap((response: any): any =>
          from(response.json()).pipe(
            tap(data => {
              console.log("data", data)
              dispatch(fetchGithubFollowersSuccess("success tomi"))
            }),
          ),
        ),
        catchError((err: any): any => {
          console.error(err)
          return of(fetchGithubFollowersError("error tomi")) // FIXME
        }),
      ),
    ),
  )
}
