import React from "react"
import {
  Toolbar,
  IconButton,
  Tooltip,
} from "@material-ui/core"
import Exit from "@material-ui/icons/ExitToApp"
import Call from "@material-ui/icons/Call"
import Menu from "@material-ui/icons/Menu"
import useLogic from "./useLogic"
import { Buttons, Title, AppBar as CoreAppBar } from "./useStyles"

function AppBar() {
  const {
    hasActiveCall,
    logout,
    refresh,
    toggleDrawer,
    isDesktop,
    activeRoom,
    handleCall,
  } = useLogic()

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
          {activeRoom && !hasActiveCall &&
            <Tooltip title="Llamar" placement="bottom">
              <IconButton color="inherit" onClick={handleCall}>
                <Call />
              </IconButton>
            </Tooltip>
          }
          <Tooltip title="Desconectar" placement="bottom">
            <IconButton color="inherit" onClick={logout}>
              <Exit />
            </IconButton>
          </Tooltip>
        </Buttons>
      </Toolbar>
    </CoreAppBar>
  )
}

export default AppBar