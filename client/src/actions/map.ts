import { from, of } from "rxjs"
import { switchMap, catchError, map, distinctUntilChanged } from "rxjs/operators"

import { api } from "../utils"
import { Geo, Action$ } from "../types"
import { RootState, Store$ } from "../store$"
import { setPlaces } from "./place"

export const setGeo = (payload: Geo) => ({
  type: "SET_GEO",
  payload,
})

export const setDistance = (payload: number) => ({
  type: "SET_DISTANCE",
  payload,
})

type Params = {
  lat: number
  lon: number
  distance: number
}

export const fetchNearbyPlacesEpic = (_action$: Action$, store$: Store$) => {
  return store$.pipe(
    map((state: RootState) => ({
      lat: state.map.geo.lat,
      lon: state.map.geo.lon,
      distance: state.map.distance,
    })),
    distinctUntilChanged((prev: Params, curr: Params) => {
      return prev.lat === curr.lat && prev.lon === curr.lon && prev.distance === curr.distance
    }),
    switchMap((params: Params) =>
      from(api.get("/places", params)).pipe(
        switchMap((res: any) => of(setPlaces(res.data))),
        catchError(() => of()),
      ),
    ),
  )
}
