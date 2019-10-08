import { fetchNearByPlacesEpic } from "./actions/map"
import { loginEpic } from "./actions/session"
import { Action$ } from "./types"
import { dispatch } from "./action$"

// FIXME function param spreading
const runEpics = (...stream$: Action$[]) => {
  fetchNearByPlacesEpic(stream$[0], stream$[1]).subscribe(dispatch)
  loginEpic(stream$[0]).subscribe(dispatch)
}

export default runEpics
