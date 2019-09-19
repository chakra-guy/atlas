import { Observable, OperatorFunction } from "rxjs"
import { scan, shareReplay, startWith, catchError } from "rxjs/operators"
import { action$ } from "./action$"
import { catchErrorLogAndContinue } from "./operators"

function createState(createStream: any): any {
  return (...streams: Observable<any>[]) => {
    return createStream(...streams).pipe(
      catchErrorLogAndContinue(),
      shareReplay({ bufferSize: 1, refCount: true }),
    )
  }
}

const defaultState = {
  color: "red",
  name: "init name",
}

const reducer = (state: any, action: any): any => {
  console.log("reducer: ", action)

  switch (action.type) {
    case "NAME_CHANGED":
      return {
        ...state,
        name: action.payload,
      }
    case "FETCH_GITHUB_FOLLOWERS_SUCCESS":
    case "FETCH_GITHUB_FOLLOWERS_ERROR":
      return {
        ...state,
        name: action.payload,
      }
    default:
      return state
  }
}

const state$ = createState((stream$: any) =>
  stream$.pipe(
    startWith(defaultState),
    scan(reducer),
  ),
)

export default state$(action$)
