import { from, of } from "rxjs"
import { switchMap, catchError, map, distinctUntilChanged } from "rxjs/operators"

import { api } from "../utils"
import { Geo, Place, Action$ } from "../types"
import { RootState, Store$ } from "../store$"

export const setGeo = (payload: Geo) => ({
  type: "SET_GEO",
  payload,
})

export const setDistance = (payload: number) => ({
  type: "SET_DISTANCE",
  payload,
})

export const setPlaces = (payload: Place[]) => ({
  type: "SET_PLACES",
  payload,
})

type Params = {
  lat: number
  lon: number
  distance: number
}

export const fetchNearByPlacesEpic = (_action$: Action$, store$: Store$) => {
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
