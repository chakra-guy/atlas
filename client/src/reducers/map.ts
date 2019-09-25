const initialState = {
  geo: { lat: 47.497903, lon: 19.054647 },
  distance: 250,
  places: [],
}

export const mapReducer = (state = initialState, action: any) => {
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
    case "SET_FIXME_PLACES":
      return {
        ...state,
        places: action.payload,
      }
    default:
      return state
  }
}
