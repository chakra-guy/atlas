import { fetchNearbyPlacesEpic } from "./actions/map"
import { loginEpic, signupEpic } from "./actions/session"
import { Action$ } from "./types"
import { dispatch } from "./action$"
import { fetchReviewsEpic } from "./actions/place"

// FIXME function param spreading
const runEpics = (...stream$: Action$[]) => {
  signupEpic(stream$[0]).subscribe(dispatch)
  loginEpic(stream$[0]).subscribe(dispatch)
  fetchReviewsEpic(stream$[0]).subscribe(dispatch)
  fetchNearbyPlacesEpic(stream$[0], stream$[1]).subscribe(dispatch)
}

export default runEpics
