import React from "react"
import { Snackbar, SnackbarContent } from "@material-ui/core"
import useLogic from "./useLogic"
import useStyles from "./useStyles"

function Notifications() {
  const { notification, handleClose, handleExited, open } = useLogic()
  const styles = useStyles({ variant: notification.type })

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      onExited={handleExited}
      autoHideDuration={2000}>
      <SnackbarContent
        className={styles.root}
        message={notification.value} />
    </Snackbar>
  )
}

export default Notifications