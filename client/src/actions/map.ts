import { from, of } from "rxjs"
import { switchMap, catchError, map, distinctUntilChanged } from "rxjs/operators"

import { api } from "../utils"

export const setGeo = (payload: any) => ({
  type: "SET_GEO",
  payload,
})

export const setDistance = (payload: any) => ({
  type: "SET_DISTANCE",
  payload,
})

export const setFixmePlaces = (payload: any) => ({
  type: "SET_FIXME_PLACES",
  payload,
})

export const fetchNearByPlaces = (payload: any) => ({
  type: "FETCH_NEAR_BY_PLACES",
  payload,
})

export const fetchNearByPlacesEpic = (_action$: any, store$: any) => {
  return store$.pipe(
    map((state: any) => ({
      lat: state.map.geo.lat,
      lon: state.map.geo.lon,
      distance: state.map.distance,
    })),
    distinctUntilChanged((prev: any, curr: any) => {
      return prev.lat === curr.lat && prev.lon === curr.lon && prev.distance === curr.distance
    }),
    switchMap((params: any) =>
      from(api.get("/places", params)).pipe(
        switchMap((res: any) => of(setFixmePlaces(res.data))),
        catchError(() => of()),
      ),
    ),
  )
}
