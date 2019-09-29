const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  user: null,
  token: null,
  error: null,
}

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOG_IN_START":
      return {
        ...state,
        isAuthenticating: true,
        error: null,
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
