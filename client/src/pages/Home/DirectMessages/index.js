import React from "react"
import useLogic from "./useLogic"
import { RoomName, Button } from "./useStyles"

function DirectMessages() {
  const { search } = useLogic()

  return (
    <>
      <Button
        onClick={search}
        size="small"
        variant="contained">Buscar</Button>
      <RoomName>Mensajes directos</RoomName>
    </>
  )
}

export default DirectMessages