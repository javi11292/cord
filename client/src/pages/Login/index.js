import React from "react"
import { Grid, Container, TextField, Button, Typography } from "@material-ui/core"
import useLogic from "./useLogic"
import useStyles from "./useStyles"

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
  const styles = useStyles()

  return (
    <Container maxWidth="sm" className={styles.root}>
      <Grid container direction="column">
        <Typography variant="h4" className={styles.title}>{isLogin ? "Login" : "Registrarse"}</Typography>

        <TextField
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
            className={styles.button}
            onClick={navigate}
            variant="outlined"
            color="primary">{isLogin ? "Registrarse" : "Cancelar"}</Button>
          <Button
            className={styles.button}
            onClick={submit}
            variant="contained"
            color="primary">Enviar</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login