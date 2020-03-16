import React from "react"
import { Typography } from "@material-ui/core"
import useLogic from "./useLogic"
import { Icon, Container } from "./useStyles"

function Splash() {
  const { handleAnimationEnd } = useLogic()

  return (
    <Container>
      <Icon fontSize="inherit" onAnimationEnd={handleAnimationEnd} />
      <Typography variant="h4">Cord</Typography>
    </Container>
  )
}

export default Splash