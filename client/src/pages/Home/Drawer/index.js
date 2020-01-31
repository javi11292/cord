import React from "react"
import useLogic from "./useLogic"
import { Drawer as CoreDrawer, Servers, Rooms } from "./useStyles"

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
      <Servers>A</Servers>

      <Rooms>BBBB</Rooms>
    </CoreDrawer>
  )
}

export default Drawer