import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Notifications from "components/Notifications"
import Splash from "pages/Splash"
import useLogic from "./useLogic"
import { Box } from "./useStyles"

const home = import("pages/Home")
const login = import("pages/Login")
const search = import("pages/Search")

const Home = React.lazy(() => home)
const Login = React.lazy(() => login)
const Search = React.lazy(() => search)

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