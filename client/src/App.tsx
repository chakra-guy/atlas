import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import "./app.css"
import Prototype from "./__prototype/Prototype"
import { Mainpage, Login, Signup } from "./pages"
import PrototypeB from "./__prototype/PrototypeB"
import Private from "./pages/Private"
import { PrivateRoute } from "./components"

export default function App(): JSX.Element {
  const [isPrototype, setIsPrototype] = useState(false)

  const isAuthenticated = false // FIXME use hook

  return (
    <Router>
      <button type="button" onClick={() => setIsPrototype(state => !state)}>
        Toggle App/Prototype
      </button>

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
