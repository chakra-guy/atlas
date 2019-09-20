import React from "react"

import { useObservable } from "../hooks/useObservable"

import { dispatch } from "./action$"
import store$ from "./store$"
import { changeName, fetchGithubFollowers } from "./testActions"
import { tap, map, distinctUntilChanged } from "rxjs/operators"

// const view$ = state$.pipe(
//   pluck('fuel'),
//   distinctUntilChanged(),
//   withLatestFrom(fuelPrice$),
//   map(([rocketFuel, fuelPrice]) => ({
//     hasError: false,
//     isLoading: false,
//     refuelCost: FUEL_CAPACITY - rocketFuel * fuelPrice
//   })),
//   startWith({
//     isLoading: true,
//     hasError: false
//   }),
//   catchError(() => of({
//     hasError: true,
//     isLoading: false
//   }))
// );

const view$ = store$.pipe(
  // Selector
  map((state: any) => ({ name: state.name, color: state.color })),
  // memoize
  // distinctUntilChanged(),
  // distinctUntilChanged((prevState: any, nextState: any) => {
  //   console.log("->: prevState", prevState)
  //   console.log("->: nextState", nextState)

  //   return prevState.name === nextState.name
  // }),
  tap(() => console.log("changed")),
)

// Component.tsx
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
