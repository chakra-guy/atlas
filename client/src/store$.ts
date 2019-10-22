import { tap, scan, startWith } from "rxjs/operators"

import action$ from "./action$"
import { Action$ } from "./types"
import { combineReducers, createState } from "./utils/storeHelpers"

import { mapReducer } from "./reducers/map"
import { sessionReducer } from "./reducers/session"
import { placesReducer } from "./reducers/places"

const rootReducer = combineReducers({
  map: mapReducer,
  session: sessionReducer,
  places: placesReducer,
})

const store$ = createState((stream$: Action$) =>
  stream$.pipe(
    startWith(undefined, { type: "INIT_STATE" }),
    scan(rootReducer),
    tap((state: RootState) => console.log("STORE", state)),
  ),
)

export type RootState = ReturnType<typeof rootReducer>
export type Store$ = ReturnType<typeof store$>

export default store$(action$)
