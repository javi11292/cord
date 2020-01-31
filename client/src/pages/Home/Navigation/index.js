import React from "react"
import useLogic from "./useLogic"
import { Drawer, Pages, Chats } from "./useStyles"

function Navigation() {
  const { isDesktop } = useLogic()

  return (
    <Drawer
      open
      variant={isDesktop ? "permanent" : "temporary"}>
      <Pages>A</Pages>

      <Chats>BBBB</Chats>
  </Drawer>
  )
}

export default Navigation