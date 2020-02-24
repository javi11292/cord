import React, { Suspense } from "react"
import { Tooltip, Icon, Dialog, DialogContent, DialogActions, Button, TextField } from "@material-ui/core"
import Add from "@material-ui/icons/Add"
import Chat from "@material-ui/icons/ChatBubble"
import useLogic from "./useLogic"
import { Drawer as CoreDrawer, Servers, Rooms, IconButton, Divider } from "./useStyles"

const DirectMessages = React.lazy(() => import("../DirectMessages"))
const Server = React.lazy(() => import("../Server"))

function Drawer() {
  const {
    activeServer,
    isDesktop,
    open,
    onClose,
    addServer,
    servers,
    showDialog,
    toggleDialog,
    serverName,
    handleChange,
    handleKeyDown,
    handleServerClick,
  } = useLogic()

  return (
    <CoreDrawer
      disableSwipeToOpen
      open={open}
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
          <IconButton active={!activeServer} onClick={handleServerClick}>
            <Chat />
          </IconButton>
        </Tooltip>

        <Divider />

        {Object.values(servers).map(({ id, name }) => (
          <Tooltip key={id} title={name} placement="right">
            <IconButton onClick={handleServerClick} value={id} active={activeServer === id}>
              <Icon>{name.slice(0, 1).toUpperCase()}</Icon>
            </IconButton>
          </Tooltip>
        ))}

        <Tooltip title="Crear servidor" placement="right">
          <IconButton color="primary" onClick={toggleDialog}>
            <Add />
          </IconButton>
        </Tooltip>
      </Servers>

      <Rooms>
        <Suspense fallback={null}>
          {!activeServer
            ? <DirectMessages />
            : <Server id={activeServer} />}
        </Suspense>
      </Rooms>
    </CoreDrawer>
  )
}

export default Drawer