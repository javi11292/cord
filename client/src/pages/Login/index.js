import React from "react"
import { Grid, TextField } from "@material-ui/core"
import useLogic from "./useLogic"
import { Button, Title, Box } from "./useStyles"

function Login() {
  const {
    submit,
    user,
    handleChange,
    handleKeyDown,
    addRef,
    navigate,
    isLogin,
  } = useLogic()

  return (
    <Box maxWidth="sm">
      <Grid container direction="column">
        <Title variant="h4">{isLogin ? "Login" : "Registrarse"}</Title>

        <TextField
          autoFocus
          variant="filled"
          inputRef={addRef}
          autoComplete="off"
          label="Usuario"
          margin="normal"
          value={user.username}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          id="username" />

        <TextField
          variant="filled"
          inputRef={addRef}
          type="password"
          label="Contraseña"
          margin="normal"
          value={user.password}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          id="password" />

        {!isLogin &&
          <TextField
            variant="filled"
            inputRef={addRef}
            type="password"
            label="Confirmar contraseña"
            margin="normal"
            value={user.confirmPassword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            id="confirmPassword" />
        }

        <Grid container justify="space-between">
          <Button
            onClick={navigate}
            variant="outlined"
            color="primary">{isLogin ? "Registrarse" : "Cancelar"}</Button>
          <Button
            onClick={submit}
            variant="contained"
            color="primary">Enviar</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Login