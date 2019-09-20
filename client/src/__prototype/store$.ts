import { Subject, Observable } from "rxjs"
import { share, tap, scan, shareReplay, startWith } from "rxjs/operators"

import { ActionShape, Action$ } from "../types"
import { fetchGithubFollowersStream } from "./testActions"
import testReducer from "./testReducer"
import { catchErrorLogAndContinue } from "./operators"
import countReducer from "./countReducer"

const createState = (createStream: any) => {
  return (...streams: Observable<any>[]) => {
    return createStream(...streams).pipe(
      catchErrorLogAndContinue(),
      shareReplay({ bufferSize: 1, refCount: true }),
    )
  }
}

const combineReducers = (reducers: any) => {
  // First get an array with all the keys of the reducers (the reducer names)
  const reducerKeys = Object.keys(reducers)

  return (state: any = {}, action: any) => {
    // This is the object we are going to return.
    const nextState: any = {}

    // Loop through all the reducer keys
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < reducerKeys.length; i++) {
      // Get the current key name
      const key = reducerKeys[i]
      // Get the current reducer
      const reducer = reducers[key]
      // Get the previous state
      const previousStateForKey = state[key]
      // Get the next state by running the reducer
      const nextStateForKey = reducer(previousStateForKey, action)
      // Update the new state for the current reducer
      nextState[key] = nextStateForKey
      // -----------------------------------
    }
    return nextState
  }
}

const createActionStream = () => new Subject<ActionShape>()
const actionSubject$ = createActionStream()

export const action$ = actionSubject$.pipe(share())

export const dispatch = (action: ActionShape) => {
  actionSubject$.next(action)
}

const startRoutines = (stream$: Action$) => [
  // FIXME how to name these? Routine, Epic, Hook,
  fetchGithubFollowersStream(stream$).subscribe(dispatch),
]

startRoutines(action$) // FIXME where to put this?

const rootReducers = combineReducers({
  test: testReducer,
  count: countReducer,
})

const store$ = createState((stream$: any) =>
  stream$.pipe(
    startWith(undefined, { type: "INIT_STATE" }),
    scan(rootReducers),
    tap((state: any) => console.log("STATE", state)),
  ),
)

export default store$(action$)
