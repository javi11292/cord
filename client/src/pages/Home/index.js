import React from "react"
import Navigation from "./Navigation"
import { Box, Content } from "./useStyles"

function Home() {
  return (
    <Box>
      <Navigation />
      <Content>
        <span>Contenido</span>
      </Content>
    </Box>
  )
}

export default Home