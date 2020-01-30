import { makeStyles } from "@material-ui/core"
import { NOTIFICATION } from "libraries/constants"

export default makeStyles(theme => ({
  root: {
    backgroundColor: props => props.variant === NOTIFICATION.error ? theme.palette.error.dark : theme.palette.primary.dark
  },
}))