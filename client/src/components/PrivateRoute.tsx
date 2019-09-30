import React from "react"
import { Route, Redirect } from "react-router-dom"
import { map, distinctUntilChanged } from "rxjs/operators"
import { useObservable } from "rxjs-hooks"

import store$ from "../store$"

const view$ = store$.pipe(
  map((state: any) => state.session.isAuthenticated),
  distinctUntilChanged(),
)

export default function PrivateRoute(props: any): JSX.Element {
  const { component: Component, ...rest } = props

  const isAuthenticated = useObservable(() => view$)

  return (
    <Route
      {...rest}
      render={p =>
        isAuthenticated ? (
          <Component {...p} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: p.location } }} />
        )
      }
    />
  )
}
