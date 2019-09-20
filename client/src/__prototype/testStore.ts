export const defaultState = {
  color: "red",
  name: "init name",
}

export default function testReducer(state: any, action: any): any {
  console.log("reducer: ", action)

  switch (action.type) {
    case "NAME_CHANGED":
      return {
        ...state,
        name: action.payload,
      }
    case "FETCH_GITHUB_FOLLOWERS_SUCCESS":
    case "FETCH_GITHUB_FOLLOWERS_ERROR":
      return {
        ...state,
        github: action.payload,
      }
    default:
      return state
  }
}
