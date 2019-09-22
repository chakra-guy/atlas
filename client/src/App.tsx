import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { styled } from "baseui"

import Prototype from "./__prototype/Prototype"
import PrototypeB from "./__prototype/PrototypeB"
import { Home, Login, Signup } from "./pages"
import Private from "./pages/Private"
import { PrivateRoute, Navbar } from "./components"

export default function App(): JSX.Element {
  const [isPrototype] = useState(false)

  return (
    <Container>
      <Router>
        {isPrototype ? (
          <>
            <Prototype />
            <PrototypeB />
          </>
        ) : (
          <Switch>
            <>
              <Navbar />

              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/private" component={Private} />
            </>
          </Switch>
        )}
      </Router>
    </Container>
  )
}

const Container = styled("div", {
  height: "100%",
})
