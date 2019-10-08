import { Action, mapState } from "../types"

const initialState = {
  geo: { lat: 47.497903, lon: 19.054647 },
  distance: 750,
  places: [],
}

export const mapReducer = (state: mapState = initialState, action: Action<any>) => {
  switch (action.type) {
    case "SET_GEO":
      return {
        ...state,
        geo: action.payload,
      }
    case "SET_DISTANCE":
      return {
        ...state,
        distance: action.payload,
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
