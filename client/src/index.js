import React from "react"
import ReactDOM from "react-dom"
import App from "components/App"
import * as serviceWorker from "serviceWorker"

ReactDOM.render(<App />, document.getElementById("root"))

function onUpdate(registration) {
  window.dispatchEvent(new CustomEvent("update", { detail: registration.waiting }))
}

serviceWorker.register({ onUpdate })