import { Subject, Observable } from "rxjs"
import { share, tap, scan, shareReplay, startWith } from "rxjs/operators"

import { ActionShape, Action$ } from "../types"
import { fetchGithubFollowersStream } from "./testActions"
import testReducer from "./testReducer"
import { catchErrorLogAndContinue } from "./operators"

const createActionStream = () => new Subject<ActionShape>()
const actionSubject$ = createActionStream()

export const action$ = actionSubject$.pipe(share())

export const dispatch = (action: ActionShape) => {
  actionSubject$.next(action)
}

// export const dispatch = (action: any): any => {
//   if (typeof action === "function") {
//     action().subscribe({
//       next: (abc: any): any => actionSubject$.next(abc),
//     })
//   } else {
//     actionSubject$.next(action)
//   }
// }

export const startRoutines = (stream$: Action$) => [
  fetchGithubFollowersStream(stream$).subscribe(dispatch),
]

startRoutines(action$) // FIXME where to put this?

function createState(createStream: any): any {
  return (...streams: Observable<any>[]) => {
    return createStream(...streams).pipe(
      catchErrorLogAndContinue(),
      shareReplay({ bufferSize: 1, refCount: true }),
    )
  }
}

const state$ = createState((stream$: any) =>
  stream$.pipe(
    startWith(undefined, { type: "INIT_STATE" }),
    scan(testReducer),
    tap((state: any) => console.log("STATE", state)),
  ),
)

export default state$(action$)
