import { from, of } from "rxjs"
import { switchMap, catchError, map } from "rxjs/operators"

import { ofType } from "../utils/operators$"
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

// FIXME could be using just state$ here
export const fetchNearByPlacesEpic = (action$: any) => {
  return action$.pipe(
    ofType<any>("FETCH_NEAR_BY_PLACES"),
    map(({ payload }: any) => ({
      "place[lat]": payload.geo.lat,
      "place[lon]": payload.geo.lon,
      "place[distance]": payload.distance,
    })),
    switchMap((params: any) =>
      from(api.get("/places", params)).pipe(
        switchMap((res: any) => of(setFixmePlaces(res.data))),
        catchError(() => of()),
      ),
    ),
  )
}
