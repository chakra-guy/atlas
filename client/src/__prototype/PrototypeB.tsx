import React from "react"
import { useObservable, useEventCallback } from "rxjs-hooks"
import { map, distinctUntilChanged, tap, ignoreElements, debounceTime } from "rxjs/operators"
import { Observable } from "rxjs"

import store$, { dispatch } from "./store$"
import { increment } from "./testActions"

const view$ = store$.pipe(
  map((state: any) => state.count),
  distinctUntilChanged(),
  tap(() => console.log("count changed")),
)

export default function PrototypeB(): JSX.Element {
  const { count } = useObservable(() => view$, { count: -1 })
  const [handleClick] = useEventCallback(
    (event$: Observable<React.SyntheticEvent<HTMLButtonElement>>) =>
      event$.pipe(
        debounceTime(500),
        tap(() => dispatch(increment())),
        ignoreElements(),
      ),
  )

  return (
    <div>
      <h1>Count: {count}</h1>
      <button type="button" onClick={() => dispatch(increment())}>
        +1
      </button>

      <button type="button" onClick={handleClick}>
        handle click debounced
      </button>
    </div>
  )
}
