import React from "react"
import useLogic from "./useLogic"
import { Drawer as CoreDrawer, Pages, Chats } from "./useStyles"

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
      <Pages>A</Pages>

      <Chats>BBBB</Chats>
    </CoreDrawer>
  )
}

export default Drawer