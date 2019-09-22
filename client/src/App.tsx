import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { styled } from "baseui"

import "./app.css"
import Prototype from "./__prototype/Prototype"
import { Mainpage, Login, Signup } from "./pages"
import PrototypeB from "./__prototype/PrototypeB"
import Private from "./pages/Private"
import { PrivateRoute } from "./components"

const MyButton = styled("button", {
  width: "120px",
  height: "40px",
  padding: "12px",
})

export default function App(): JSX.Element {
  const [isPrototype, setIsPrototype] = useState(false)

  const isAuthenticated = false // FIXME use hook

  return (
    <Router>
      <MyButton type="button" onClick={() => setIsPrototype(state => !state)}>
        Toggle App/Prototype
      </MyButton>

      {isPrototype ? (
        <>
          <Prototype />
          <PrototypeB />
        </>
      ) : (
        <Switch>
          <>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/private">Private</Link>
              </li>
            </ul>

            <hr />

            <Route exact path="/" component={Mainpage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/private" component={Private} isAuthenticated={isAuthenticated} />
          </>
        </Switch>
      )}
    </Router>
  )
}
