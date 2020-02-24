import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Notifications from "components/Notifications"
import Splash from "pages/Splash"
import useLogic from "./useLogic"
import { Box } from "./useStyles"

const Home = React.lazy(() => import("pages/Home"))
const Login = React.lazy(() => import("pages/Login"))
const Search = React.lazy(() => import("pages/Search"))

function Main() {
  const { username } = useLogic()

  const homeRedirect = username !== "" && <Redirect to="/" />
  const loginRedirect = username === "" && <Redirect to="/login" />

  return (
    <Box>
      <Notifications />
      {username === null
        ? <Splash />
        : (
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Suspense fallback={null}>
              <Switch>
                <Route path={["/login", "/register"]}>
                  {homeRedirect}
                  <Login />
                </Route>

                <Route path="/search">
                  {loginRedirect}
                  <Search />
                </Route>

                <Route>
                  {loginRedirect}
                  <Home />
                </Route>

              </Switch>
            </Suspense>
          </BrowserRouter>
        )}
    </Box>
  )
}

export default React.memo(Main)