const initialState = {
  count: 0,
}

export default function countReducer(state = initialState, action: any) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1,
      }

    default:
      return state
  }
}
