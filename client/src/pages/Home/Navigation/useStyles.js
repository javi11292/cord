import styled from "styled-components"
import { Drawer as MuiDrawer } from "@material-ui/core"

export const Drawer = styled(MuiDrawer)`
  & .MuiDrawer-paper {
    flex-direction: row;
    ${props => props.theme.breakpoints.up("sm")} {
    position: relative;
    }
  }
`

export const Pages = styled.div`
  background: ${props => props.theme.palette.background.default};
`

export const Chats = styled.div`
  flex: 1;
`