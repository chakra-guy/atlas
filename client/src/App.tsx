import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { styled } from "baseui"

import { Home, Login, Signup, Private } from "./pages"
import { PrivateRoute, Navbar } from "./components"

const Container = styled("div", {
  height: "100%",
})

export default function App(): JSX.Element {
  return (
    <Container>
      <Router>
        <Switch>
          <>
            <Navbar />

            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/private" component={Private} />
          </>
        </Switch>
      </Router>
    </Container>
  )
}
