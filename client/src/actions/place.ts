import { from, of } from "rxjs"
import { switchMap, catchError, startWith, pluck } from "rxjs/operators"

import { api } from "../utils"
import { Action$, Action, Place } from "../types"
import { ofType } from "../utils/operators$"

export const setPlaces = (payload: Place[]) => ({
  type: "SET_PLACES",
  payload,
})

export const fetchReviews = (payload: any) => ({
  type: "FETCH_REVIEWS",
  payload,
})

export const fetchReviewsStart = () => ({
  type: "FETCH_REVIEWS_START",
})

export const fetchReviewsSuccess = (payload: any) => ({
  type: "FETCH_REVIEWS_SUCCESS",
  payload,
})

export const fetchReviewsFailed = () => ({
  type: "FETCH_REVIEWS_FAILED",
})

export const fetchReviewsEpic = (action$: Action$) => {
  return action$.pipe(
    ofType<Action<any>>("FETCH_REVIEWS"),
    pluck("payload"),
    switchMap((place_id: number) => {
      const params = { "review[place_id]": place_id }

      return from(api.get("/reviews", params)).pipe(
        switchMap(({ data }: any) => of(fetchReviewsSuccess({ place_id, data }))),
        catchError(() => of(fetchReviewsFailed())),
        startWith(fetchReviewsStart()),
      )
    }),
  )
}
