import React from "react"

import { useObservable } from "../hooks/useObservable"

import { Action$ } from "../types"
import { dispatch, action$ } from "./action$"
import testStore from "./testStore"
import { fetchGithubFollowersStream, changeName, fetchGithubFollowers } from "./testActions"

const startRoutines = (stream$: Action$) => [fetchGithubFollowersStream(stream$).subscribe()]

startRoutines(action$)

// Component.tsx
export default function Prototype(): JSX.Element {
  const { name, color } = useObservable<any>(testStore, () => ({}))

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
