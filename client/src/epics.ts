import { fetchNearByPlacesEpic } from "./actions/map"
import { loginEpic, signupEpic } from "./actions/session"
import { Action$ } from "./types"
import { dispatch } from "./action$"

// FIXME function param spreading
const runEpics = (...stream$: Action$[]) => {
  fetchNearByPlacesEpic(stream$[0], stream$[1]).subscribe(dispatch)
  signupEpic(stream$[0]).subscribe(dispatch)
  loginEpic(stream$[0]).subscribe(dispatch)
}

export default runEpics
