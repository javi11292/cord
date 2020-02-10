import React from "react"
import { Tooltip, Icon, Dialog, DialogContent, DialogActions, Button, TextField } from "@material-ui/core"
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
    showDialog,
    toggleDialog,
    serverName,
    handleChange,
    handleKeyDown,
  } = useLogic()

  return (
    <CoreDrawer
      disableSwipeToOpen
      open={openDrawer}
      onClose={onClose}
      onOpen={onClose}
      variant={isDesktop ? "permanent" : "temporary"}>
      <Dialog open={showDialog} onClose={toggleDialog}>
        <DialogContent>
          <TextField
            autoFocus
            autoComplete="off"
            label="Nombre del servidor"
            margin="dense"
            value={serverName}
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
            onKeyDown={handleKeyDown} />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog}>Cancelar</Button>
          <Button onClick={addServer} color="primary">Crear</Button>
        </DialogActions>
      </Dialog>

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
          <IconButton color="limegreen" onClick={toggleDialog}>
            <Add />
          </IconButton>
        </Tooltip>
      </Servers>

      <Rooms>BBBB</Rooms>
    </CoreDrawer>
  )
}

export default Drawer