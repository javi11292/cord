import React, { Suspense } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Notifications from "components/Notifications"
import Splash from "pages/Splash"
import useStore from "hooks/useStore"
import { Box } from "./useStyles"

const Home = React.lazy(() => import("pages/Home"))
const Login = React.lazy(() => import("pages/Login"))
const Search = React.lazy(() => import("pages/Search"))

function Main() {
  const [logged] = useStore("logged")

  const homeRedirect = logged === true && <Redirect to="/" />
  const loginRedirect = logged === false && <Redirect to="/login" />

  return (
    <Box>
      <Notifications />
      {logged === null
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