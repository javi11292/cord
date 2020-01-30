import React from "react"
import Notifications from "components/Notifications"
import useStyles from "./useStyles"

function Main() {
  const styles = useStyles()

  return (
    <div className={styles.root}>
      <Notifications />
    </div>
  )
}

export default React.memo(Main)