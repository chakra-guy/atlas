import { Subject } from "rxjs"
import { share } from "rxjs/operators"

import { ActionShape } from "../types"

const createActionStream = () => new Subject<ActionShape>()
const actionSubject$ = createActionStream()

export const action$ = actionSubject$.pipe(share())

export const dispatch = (action: ActionShape) => {
  actionSubject$.next(action)
}

// export const dispatch = (action: any): any => {
//   if (typeof action === "function") {
//     action().subscribe({
//       next: (abc: any): any => actionSubject$.next(abc),
//     })
//   } else {
//     actionSubject$.next(action)
//   }
// }
