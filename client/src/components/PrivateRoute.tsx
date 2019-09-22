import React from "react"
import { Route, Redirect } from "react-router-dom"

export default function PrivateRoute(props: any): JSX.Element {
  const { component: Component, ...rest } = props

  const isAuthenticated = false // FIXME use hook

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
