import React from "react"
import { Typography } from "@material-ui/core"
import useLogic from "./useLogic"
import { Icon, Container } from "./useStyles"

function Splash() {
  const { handleAnimationEnd, handleAnimationStart } = useLogic()

  return (
    <Container>
      <Icon fontSize="inherit" onAnimationEnd={handleAnimationEnd} onAnimationStart={handleAnimationStart} />
      <Typography variant="h4">Cord</Typography>
    </Container>
  )
}

export default Splash