import React from "react"
import ReactDOM from "react-dom"

import { Client as Styletron } from "styletron-engine-atomic"
import { Provider as StyletronProvider } from "styletron-react"
import { LightTheme, BaseProvider } from "baseui"

import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import store$ from "./store$"
import action$ from "./action$"
import runEpics from "./epics"

const engine = new Styletron()

runEpics(action$, store$)

ReactDOM.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <App />
    </BaseProvider>
  </StyletronProvider>,
  document.getElementById("root"),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
