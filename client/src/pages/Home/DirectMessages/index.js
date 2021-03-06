import React from "react"
import { List, ListItemText } from "@material-ui/core"
import useLogic from "./useLogic"
import { RoomName, Button, ListItem } from "./useStyles"

function DirectMessages() {
  const { search, activeRoom, rooms, handleClick } = useLogic()

  return (
    <>
      <Button
        onClick={search}
        size="small"
        variant="contained">Buscar</Button>
      <RoomName>Mensajes directos</RoomName>
      <List>
        {Object.values(rooms).map(({ id, name }) => (
          <ListItem
            data-id={id}
            onClick={handleClick}
            button
            key={id}
            selected={id === activeRoom}>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default DirectMessages