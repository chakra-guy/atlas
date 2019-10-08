import { Action, sessionState } from "../types"

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
}

export const sessionReducer = (state: sessionState = initialState, action: Action<any>) => {
  switch (action.type) {
    case "LOG_IN_START":
      return {
        ...initialState,
        isAuthenticating: true,
      }
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case "LOG_IN_FAILED":
      return {
        ...state,
        isAuthenticating: false,
        error: action.payload.error,
      }
    default:
      return state
  }
}
