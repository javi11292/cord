import styled from "styled-components"
import { Typography, AppBar as MuiAppBar } from "@material-ui/core"

export const AppBar = styled(MuiAppBar)`
  z-index: ${props => props.theme.zIndex.drawer + 1};
`

export const Buttons = styled.div`
  margin-left: auto;
`

export const Title = styled(Typography)`
  cursor: pointer;
  ${props => props.theme.breakpoints.up("sm")} {
    padding-left: 0.75rem;
  }
`