import React from "react"
import AppBar from "./AppBar"
import Drawer from "./Drawer"
import { Box, Frame, Content } from "./useStyles"

function Home() {
  return (
    <Box>
      <AppBar />
      <Frame>
        <Drawer />
        <Content>
          <span>Coming soon...</span>
        </Content>
      </Frame>
    </Box>
  )
}

export default Home