import { Action, sessionState } from "../types"

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
}

export const sessionReducer = (state: sessionState = initialState, action: Action<any>) => {
  switch (action.type) {
    case "SIGN_UP_START":
    case "LOG_IN_START":
      return {
        ...initialState,
        isAuthenticating: true,
      }
    case "SIGN_UP_SUCCESS":
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case "SIGN_UP_FAILED":
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
