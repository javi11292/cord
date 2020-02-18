import React from "react"
import { RoomName } from "./useStyles"

function Server({ id }) {
  return (
    <RoomName>{id}</RoomName>
  )
}

export default Server