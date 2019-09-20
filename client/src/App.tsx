import React, { useState } from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import "./app.css"
import Prototype from "./__prototype/Prototype"
import { Mainpage, Login, Signup } from "./pages"
import PrototypeB from "./__prototype/PrototypeB"

export default function App(): JSX.Element {
  const [isPrototype, setIsPrototype] = useState(true)

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
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/Signup">Signup</Link>
              </li>
            </ul>

            <hr />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={Mainpage} />
          </div>
        </Switch>
      )}
    </Router>
  )
}
