import { Subject } from "rxjs"
import { share } from "rxjs/operators"

import { ActionShape } from "./types"

const createActionStream = () => new Subject<ActionShape>()
const actionSubject$ = createActionStream()
const action$ = actionSubject$.pipe(share())

export const dispatch = (action: ActionShape) => {
  actionSubject$.next(action)
}

export default action$
