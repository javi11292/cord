import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Notifications from "components/Notifications"
import useLogic from "./useLogic"
import { Box } from "./useStyles"

const Home = React.lazy(() => import("pages/Home"))
const Login = React.lazy(() => import("pages/Login"))

function Main() {
  const { logged } = useLogic()

  return logged === null
    ? null
    : (
      <Box>
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
      </Box>
    )
}

export default React.memo(Main)