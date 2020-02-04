import React from "react"
import Add from "@material-ui/icons/Add"
import Chat from "@material-ui/icons/ChatBubble"
import useLogic from "./useLogic"
import { Drawer as CoreDrawer, Servers, Rooms, IconButton } from "./useStyles"

function Drawer() {
  const {
    isDesktop,
    openDrawer,
    onClose,
  } = useLogic()

  return (
    <CoreDrawer
      disableSwipeToOpen
      open={openDrawer}
      onClose={onClose}
      onOpen={onClose}
      variant={isDesktop ? "permanent" : "temporary"}>
      <Servers>
        <IconButton color="inherit">
          <Chat />
        </IconButton>
        <IconButton color="inherit">
          <Add />
        </IconButton>
      </Servers>

      <Rooms>BBBB</Rooms>
    </CoreDrawer>
  )
}

export default Drawer