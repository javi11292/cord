import React from "react"
import { Tooltip, Icon } from "@material-ui/core"
import Add from "@material-ui/icons/Add"
import Chat from "@material-ui/icons/ChatBubble"
import useLogic from "./useLogic"
import { Drawer as CoreDrawer, Servers, Rooms, IconButton, Divider } from "./useStyles"

function Drawer() {
  const {
    isDesktop,
    openDrawer,
    onClose,
    addServer,
    servers,
  } = useLogic()

  return (
    <CoreDrawer
      disableSwipeToOpen
      open={openDrawer}
      onClose={onClose}
      onOpen={onClose}
      variant={isDesktop ? "permanent" : "temporary"}>
      <Servers>
        <Tooltip title="Mensajes directos" placement="right">
          <IconButton>
            <Chat />
          </IconButton>
        </Tooltip>

        <Divider />

        {servers.map(({ id, name }) => (
          <Tooltip key={id} title={name} placement="right">
            <IconButton>
              <Icon>{name.slice(0, 1).toUpperCase()}</Icon>
            </IconButton>
          </Tooltip>
        ))}

        <Tooltip title="Crear servidor" placement="right">
          <IconButton color="limegreen" onClick={addServer}>
            <Add />
          </IconButton>
        </Tooltip>
      </Servers>

      <Rooms>BBBB</Rooms>
    </CoreDrawer>
  )
}

export default Drawer