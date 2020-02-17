import React from "react"
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core"
import Exit from "@material-ui/icons/ExitToApp"
import Menu from "@material-ui/icons/Menu"
import useLogic from "./useLogic"
import { Buttons, Title } from "./useStyles"

function AppBar() {
  const { logout, refresh, toggleDrawer, isDesktop } = useLogic()

  return (
    <MuiAppBar position="static" color="inherit">
      <Toolbar variant="dense" disableGutters>
        {!isDesktop &&
          <IconButton color="inherit" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
        }

        <Title variant="h6" onClick={refresh}>Smack</Title>

        <Buttons>
          <IconButton color="inherit" onClick={logout}>
            <Exit />
          </IconButton>
        </Buttons>
      </Toolbar>
    </MuiAppBar>
  )
}

export default AppBar