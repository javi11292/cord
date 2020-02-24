import React from "react"
import { List, ListItem, ListItemText } from "@material-ui/core"
import useLogic from "./useLogic"
import { RoomName, Button } from "./useStyles"

function getRoomName(name, currentUser, users) {
  return name || users.find(user => user !== currentUser)
}

function DirectMessages() {
  const { search, activeRoom, rooms, user } = useLogic()

  return (
    <>
      <Button
        onClick={search}
        size="small"
        variant="contained">Buscar</Button>
      <RoomName>Mensajes directos</RoomName>
      <List>
        {Object.values(rooms).map(({ id, name, users }) => (
          <ListItem button key={id} selected={id === activeRoom}>
            <ListItemText primary={getRoomName(name, user, users)} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default DirectMessages