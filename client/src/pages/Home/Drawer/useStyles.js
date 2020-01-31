import styled from "styled-components"
import { SwipeableDrawer } from "@material-ui/core"

export const Drawer = styled(SwipeableDrawer)`
  & .MuiDrawer-paper {
    display: grid;
    grid-template-columns: auto 1fr;
    ${props => props.theme.breakpoints.up("sm")} {
      position: relative;
    }
  }
`

export const Pages = styled.div`
  background: ${props => props.theme.palette.background.default};
`

export const Chats = styled.div`

`