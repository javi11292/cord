import React from "react"
import ArrowBack from "@material-ui/icons/ArrowBack"
import useLogic from "./useLogic"
import { Box, Input, TextField, IconButton } from "./useStyles"

function Search() {
  const { back } = useLogic()

  return (
    <Box maxWidth="sm">
      <Input>
        <IconButton size="small" onClick={back}>
          <ArrowBack />
        </IconButton>
        <TextField margin="dense" placeholder="Nombre" />
      </Input>
      Coming soon...
      </Box>
  )
}

export default Search