import { Subject } from "rxjs"
import { share, tap, scan, startWith } from "rxjs/operators"

import { ActionShape, Action$ } from "./types"
import { combineReducers, createState } from "./utils/storeHelpers"

import { mapReducer } from "./reducers/map"
import { sessionReducer } from "./reducers/session"
import { fetchNearByPlacesEpic } from "./actions/map"
import { loginEpic } from "./actions/session"

const createActionStream = () => new Subject<ActionShape>()
const actionSubject$ = createActionStream()

export const action$ = actionSubject$.pipe(share())

export const dispatch = (action: ActionShape) => {
  actionSubject$.next(action)
}

// FIXME arg spreading with ts
export const runEpics = (...stream$: any) => [
  fetchNearByPlacesEpic(stream$[0], stream$[1]).subscribe(dispatch),
  loginEpic(stream$[0]).subscribe(dispatch),
]

const rootReducers = combineReducers({
  map: mapReducer,
  session: sessionReducer,
})

const store$ = createState((stream$: any) =>
  stream$.pipe(
    startWith(undefined, { type: "INIT_STATE" }),
    scan(rootReducers),
    tap((state: any) => console.log("STATE", state)),
  ),
)

export default store$(action$)
