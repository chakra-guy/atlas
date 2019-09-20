import React from "react"
import { map, distinctUntilChanged, tap, debounceTime, switchMap } from "rxjs/operators"

import { useObservable } from "../hooks/useObservable"
import store$, { dispatch } from "./store$"
import { increment } from "./testActions"

const view$ = store$.pipe(
  map((state: any) => state.count),
  distinctUntilChanged(),
  tap(() => console.log("count changed")),
)

export default function PrototypeB(): JSX.Element {
  const { count } = useObservable<any>(view$, () => ({}))

  return (
    <div>
      <h1>Count: {count}</h1>
      <button type="button" onClick={() => dispatch(increment())}>
        +1
      </button>

      {/* <button type="button" onClick={e => onClick$.next(e)}>
        handle click debounced
      </button> */}
    </div>
  )
}
