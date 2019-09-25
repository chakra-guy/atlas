const initialState = {
  isAuthenticating: false,
  user: null,
  token: null,
}

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOG_IN_START":
      return {
        ...state,
        isAuthenticating: true,
      }
    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isAuthenticating: false,
        user: action.payload.user,
        token: action.payload.token,
      }
    case "LOG_IN_FAILED":
      return {
        ...state,
        isAuthenticating: false,
      }
    default:
      return state
  }
}
