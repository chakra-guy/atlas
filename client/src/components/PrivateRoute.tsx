import React from "react"
import { Route, Redirect } from "react-router-dom"

export default function PrivateRoute(props: any): JSX.Element {
  const { component: Component, isAuthenticated, ...rest } = props

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
