import React from "react"
import { List, ListItem, ListItemText } from "@material-ui/core"
import useLogic from "./useLogic"
import { RoomName, Button } from "./useStyles"

function DirectMessages() {
  const { search, activeRoom, rooms } = useLogic()

  return (
    <>
      <Button
        onClick={search}
        size="small"
        variant="contained">Buscar</Button>
      <RoomName>Mensajes directos</RoomName>
      <List>
        {Object.values(rooms).map(({ id, name }) => (
          <ListItem button key={id} selected={id === activeRoom}>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default DirectMessages