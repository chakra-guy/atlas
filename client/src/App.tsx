import React, { useEffect } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { styled } from "baseui"

import { Home, Login, Signup, Account } from "./pages"
import { PrivateRoute, Navbar } from "./components"
import history from "./history"
import { dispatch } from "./action$"
import { loginSuccess } from "./actions/session"

const Container = styled("div", {
  height: "100%",
})

export default function App(): JSX.Element {
  useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem("token") || "")
      if (token) dispatch(loginSuccess(token))
    } catch (error) {
      // ignore
    }
  }, [])

  return (
    <Container>
      <Router history={history}>
        <Switch>
          <>
            <Navbar />

            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/account" component={Account} />
          </>
        </Switch>
      </Router>
    </Container>
  )
}
