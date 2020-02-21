import React from "react"
import {
  Toolbar,
  IconButton,
} from "@material-ui/core"
import Exit from "@material-ui/icons/ExitToApp"
import Menu from "@material-ui/icons/Menu"
import useLogic from "./useLogic"
import { Buttons, Title, AppBar as CoreAppBar } from "./useStyles"

function AppBar() {
  const { logout, refresh, toggleDrawer, isDesktop } = useLogic()

  return (
    <CoreAppBar position="static" color="inherit">
      <Toolbar variant="dense" disableGutters>
        {!isDesktop &&
          <IconButton color="inherit" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
        }

        <Title variant="h6" onClick={refresh}>Cord</Title>

        <Buttons>
          <IconButton color="inherit" onClick={logout}>
            <Exit />
          </IconButton>
        </Buttons>
      </Toolbar>
    </CoreAppBar>
  )
}

export default AppBar