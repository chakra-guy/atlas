import React from "react"

import { useObservable } from "../hooks/useObservable"
import store$, { dispatch } from "./store$"
import { changeName, fetchGithubFollowers } from "./testActions"

const view$ = store$.pipe()

export default function Prototype(): JSX.Element {
  const { name, color } = useObservable<any>(view$, () => ({}))

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
