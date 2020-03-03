import React from "react"
import { Snackbar, IconButton } from "@material-ui/core"
import Call from "@material-ui/icons/PhoneEnabled"
import CallEnd from "@material-ui/icons/PhoneDisabled"
import useLogic from "./useLogic"
import { SnackbarContent } from "./useStyles"

function Content({ message, handleClick }) {
  switch (message.state) {
    case "offer": {
      const action = (
        <>
          <IconButton onClick={handleClick}>
            <CallEnd />
          </IconButton>
          <IconButton data-call onClick={handleClick}>
            <Call />
          </IconButton>
        </>
      )

      return (
        <SnackbarContent
          action={action}
          message={`Llamada de ${message.room}`} />
      )
    }

    case "connected": {
      const action = (
        <IconButton onClick={handleClick}>
          <CallEnd />
        </IconButton>
      )

      return (
        <SnackbarContent
          variant="connection"
          action={action}
          message={message.room} />
      )
    }

    default: {
      const action = (
        <IconButton onClick={handleClick}>
          <CallEnd />
        </IconButton>
      )

      return (
        <SnackbarContent
          action={action}
          message={`Llamando a ${message.room}`} />
      )
    }
  }
}

function Calls() {
  const { open, message, handleClick, handleExited } = useLogic()

  return (
    <Snackbar
      onExited={handleExited}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}>
      <Content message={message} handleClick={handleClick} />
    </Snackbar>
  )
}

export default Calls