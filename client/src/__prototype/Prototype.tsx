import React from "react"
import { useObservable } from "rxjs-hooks"
import { map, distinctUntilChanged, tap } from "rxjs/operators"

import store$, { dispatch } from "./store$"
import { changeName, fetchGithubFollowers } from "./testActions"

const view$ = store$.pipe(
  map((state: any) => state.test),
  distinctUntilChanged(),
  tap(() => console.log("test changed")),
)

export default function Prototype(): JSX.Element {
  const { name, color } = useObservable(() => view$, { name: "-", color: "-" })

  return (
    <div>
      <h1>
        {name} - {color}
      </h1>
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
