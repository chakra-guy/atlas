import { Subject } from "rxjs"
import { share, tap, scan, startWith } from "rxjs/operators"

import { ActionShape, Action$ } from "./types"
import { fetchNearByPlacesEpic } from "./pages/homeActions"
import { mapReducer } from "./pages/homeReducer"
import { combineReducers, createState } from "./utils/storeHelpers"

const createActionStream = () => new Subject<ActionShape>()
const actionSubject$ = createActionStream()

export const action$ = actionSubject$.pipe(share())

export const dispatch = (action: ActionShape) => {
  actionSubject$.next(action)
}

export const runEpics = (stream$: Action$) => [fetchNearByPlacesEpic(stream$).subscribe(dispatch)]

const rootReducers = combineReducers({
  map: mapReducer, // FIXME rename this
})

const store$ = createState((stream$: any) =>
  stream$.pipe(
    startWith(undefined, { type: "INIT_STATE" }),
    scan(rootReducers),
    tap((state: any) => console.log("STATE", state)),
  ),
)

export default store$(action$)
