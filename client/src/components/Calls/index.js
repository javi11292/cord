import React from "react"
import { Snackbar, IconButton } from "@material-ui/core"
import Call from "@material-ui/icons/PhoneEnabled"
import CallEnd from "@material-ui/icons/PhoneDisabled"
import useLogic from "./useLogic"
import { SnackbarContent, Video } from "./useStyles"

function Content({ message, handleClick }) {
  if (!message) return null

  if (message.isCalling) {
    const action = (
      <IconButton onClick={handleClick}>
        <CallEnd />
      </IconButton>
    )

    return (
      <SnackbarContent
        action={action}
        message={`Llamando a ${message.name}`} />
    )
  } else {
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
        message={`Llamada de ${message.name}`} />
    )
  }
}

function Calls() {
  const { open, message, handleClick, handleExited, mediaRef } = useLogic()

  return (
    <>
      <Video ref={mediaRef} width="500px" autoPlay />
      <Snackbar
        onExited={handleExited}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}>
        <Content message={message} handleClick={handleClick} />
      </Snackbar>
    </>
  )
}

export default Calls