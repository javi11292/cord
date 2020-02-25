import React from "react"
import AppBar from "./AppBar"
import Drawer from "./Drawer"
import { Box, Frame, Content, TextField } from "./useStyles"

function Home() {
  return (
    <Box>
      <AppBar />
      <Frame>
        <Drawer />
        <Content>
          <span>Coming soon...</span>
          <TextField
            variant="filled"
            margin="dense"
            placeholder="Mensaje" />
        </Content>
      </Frame>
    </Box>
  )
}

export default Home