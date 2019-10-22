import { Action, placeState } from "../types"

const initialState = {
  places: [],
  isReviewsLoading: false,
}

export const placesReducer = (state: placeState = initialState, action: Action<any>) => {
  switch (action.type) {
    case "FETCH_REVIEWS_START":
      return {
        ...state,
        isReviewsLoading: true,
      }
    case "FETCH_REVIEWS_SUCCESS":
      return {
        ...state,
        isReviewsLoading: false,
        places: state.places.map(place => {
          if (place.id === action.payload.place_id) {
            return {
              ...place,
              reviews: action.payload.data,
            }
          }

          return place
        }),
      }
    case "FETCH_REVIEWS_FAILED":
      return {
        ...state,
        isReviewsLoading: false,
      }
    case "SET_PLACES":
      return {
        ...state,
        places: action.payload,
      }
    default:
      return state
  }
}
