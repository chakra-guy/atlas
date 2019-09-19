import React from "react"

import { Subject, from, of } from "rxjs"
import { fromFetch } from "rxjs/fetch"
import { startWith, scan, map, switchMap, catchError } from "rxjs/operators"
import { useObservable } from "../hooks/useObservable"

// create our stream as a subject so arbitrary data can be sent on the stream
const action$ = new Subject()

// Initial State
const initState = "Harry"

// Redux reducer
const reducer = (state: any, action: any): any => {
  switch (action.type) {
    case "NAME_CHANGED":
      return action.payload
    case "FETCH_GITHUB_FOLLOWERS_SUCCESS":
    case "FETCH_GITHUB_FOLLOWERS_ERROR":
      return action.payload.toString()
    default:
      return state
  }
}

// Reduxification
const store$ = action$.pipe(
  startWith(initState),
  scan<any>(reducer),
)

// Higher order function to send actions to the stream
const dispatch = (action: any): any => {
  if (typeof action === "function") {
    action().subscribe({
      next: (abc: any): any => action$.next(abc),
      complete: () => console.log("completed"),
    })
  } else {
    action$.next(action)
  }
}

// Example action function
const changeName = (payload: any): any => ({
  type: "NAME_CHANGED",
  payload,
})

const fetchGithubFollowersSuccess = (payload: any): any => ({
  type: "FETCH_GITHUB_FOLLOWERS_SUCCESS",
  payload,
})

const fetchGithubFollowersError = (payload: any): any => ({
  type: "FETCH_GITHUB_FOLLOWERS_ERROR",
  payload,
})

// return from([1, 2, 3]).pipe(map(fetchGithubFollowersSuccess))

const fetchGithubFollowers = (payload: any): any => {
  return () =>
    fromFetch("https://api.github.com/users?per_page=5").pipe(
      switchMap((response: any): any =>
        from(response.json()).pipe(
          map(data => {
            console.log("data", data)

            return fetchGithubFollowersSuccess("success tomi")
          }),
        ),
      ),
      catchError((err: any): any => {
        console.error(err)
        return of(fetchGithubFollowersError("error tomi"))
      }),
    )
}

// subscribe and render the view
store$.subscribe(state => {
  console.log("state", state)
})

export default function Test(): JSX.Element {
  const nameState = useObservable<string>(store$)

  return (
    <div>
      <h1>{nameState}</h1>
      <button type="button" onClick={() => dispatch(changeName("Harry"))}>
        Harry
      </button>
      <button type="button" onClick={() => dispatch(changeName("Sally"))}>
        Sally
      </button>
      <hr />
      <button type="button" onClick={() => dispatch(fetchGithubFollowers("tamas_soos"))}>
        fetch github followers
      </button>
    </div>
  )
}
