import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Notifications from "components/Notifications"
import useLogic from "./useLogic"
import useStyles from "./useStyles"

const Home = React.lazy(() => import("pages/Home"))
const Login = React.lazy(() => import("pages/Login"))

function Main() {
  const { logged } = useLogic()
  const styles = useStyles()

  return logged === null
    ? null
    : (
      <div className={styles.root}>
        <Notifications />
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Suspense fallback={null}>
            <Switch>
              <Route path={["/login", "/register"]}>
                {logged && <Redirect to="/" />}
                <Login />
              </Route>

              <Route>
                {!logged && <Redirect to="/login" />}
                <Home />
              </Route>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </div>
    )
}

export default React.memo(Main)