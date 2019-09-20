import { Observable } from "rxjs"
import { shareReplay, scan, tap, startWith } from "rxjs/operators"
import { catchErrorLogAndContinue } from "./operators"
import { action$, dispatch } from "./action$"
import testReducer, { defaultState } from "./testStore"
import { fetchGithubFollowersStream } from "./testActions"
import { Action$ } from "../types"

export function createState(createStream: any): any {
  return (...streams: Observable<any>[]) => {
    return createStream(...streams).pipe(
      catchErrorLogAndContinue(),
      shareReplay({ bufferSize: 1, refCount: true }),
    )
  }
}

const startRoutines = (stream$: Action$) => [
  fetchGithubFollowersStream(stream$).subscribe(dispatch),
]

startRoutines(action$)

// const reducers = combineReducers([testReducer])

const store$ = createState((stream$: any) =>
  stream$.pipe(
    startWith(defaultState),
    scan(testReducer),
    // tap((state: any) => console.log("STATE", state)),
  ),
)

export default store$(action$)
