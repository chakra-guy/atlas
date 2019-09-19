import { OperatorFunction, Observable } from "rxjs"
import { filter, catchError } from "rxjs/operators"
import { ActionType, Action } from "../types"

export function ofType<P>(...keys: ActionType[]): OperatorFunction<Action<any>, Action<P>> {
  return source => {
    const keySet = new Set(keys)
    return source.pipe(filter(({ type }) => keySet.has(type)))
  }
}

export function catchErrorLogAndContinue<T>(): OperatorFunction<T, T> {
  return (source: Observable<T>) =>
    source.pipe(
      catchError((error, stream) => {
        console.error("from catchErrorLogAndContinue", error)
        return stream
      }),
    )
}
