import { from, of } from "rxjs"
import { switchMap, catchError, map, distinctUntilChanged, pluck } from "rxjs/operators"

import { api } from "../utils"
import { Geo, Action$, mapState } from "../types"
import { Store$ } from "../store$"
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
  lng: number
  distance: number
}

export const fetchNearbyPlacesEpic = (_action$: Action$, store$: Store$) => {
  return store$.pipe(
    pluck("map"),
    distinctUntilChanged(),
    map((map: mapState) => ({
      lat: map.geo.lat,
      lng: map.geo.lng,
      distance: map.distance,
    })),
    switchMap((params: Params) =>
      from(api.get("/places", params)).pipe(
        switchMap((res: any) => of(setPlaces(res.data))),
        catchError(() => of()),
      ),
    ),
  )
}
