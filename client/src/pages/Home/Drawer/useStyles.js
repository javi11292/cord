import styled from "styled-components"
import { SwipeableDrawer, IconButton as MuiIconButton } from "@material-ui/core"

export const Drawer = styled(SwipeableDrawer)`
  & .MuiDrawer-paper {
    display: grid;
    grid-template-columns: auto 1fr;
    ${props => props.theme.breakpoints.up("sm")} {
      position: relative;
    }
  }
`

export const IconButton = styled(MuiIconButton)`
  background: ${props => props.theme.palette.background.paper};
  padding: 0.6rem;
  @media (hover: none) {
    && {
      background: ${props => props.theme.palette.background.paper};
    }
  }
  &:nth-child(n+2){
    margin-top: 0.5rem;
  }
`

export const Servers = styled.div`
  background: ${props => props.theme.palette.background.default};
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
`

export const Rooms = styled.div`

`