import React from "react"
import { List, ListItem, ListItemText } from "@material-ui/core"
import ArrowBack from "@material-ui/icons/ArrowBack"
import useLogic from "./useLogic"
import { Box, Input, TextField, IconButton } from "./useStyles"

function Search() {
  const { back, handleChange, handleClick, value, users } = useLogic()

  return (
    <Box maxWidth="sm">
      <Input>
        <IconButton size="small" onClick={back}>
          <ArrowBack />
        </IconButton>
        <TextField
          autoFocus
          value={value}
          onChange={handleChange}
          margin="dense"
          placeholder="Nombre" />
      </Input>
      {users.length > 0
        ? (
          <List>
            {users.map(({ username }) => (
              <ListItem button key={username} onClick={handleClick} id={username}>
                <ListItemText primary={username} />
              </ListItem>
            ))}
          </List>
        )
        : "Sin resultados"
      }
    </Box>
  )
}

export default Search