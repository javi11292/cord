import React from "react"
import styled from "styled-components"
import { Divider as MuiDivider, SwipeableDrawer, IconButton as MuiIconButton } from "@material-ui/core"

export const Drawer = styled(SwipeableDrawer)`
  overflow: auto;
  & .MuiDrawer-paper {
    display: grid;
    grid-template-columns: auto 1fr;
    ${props => props.theme.breakpoints.up("sm")} {
      position: relative;
    }
  }
`

export const IconButton = styled(React.forwardRef(({ active, ...props }, ref) => <MuiIconButton {...props} ref={ref} />))`
  line-height: 1;
  background: ${props => !props.active ? props.theme.palette.background.paper : props.theme.palette.primary.main};
  padding: 0.6rem;
  &:hover {
    background: ${props => !props.active ? props.theme.palette.action.disabled : props.theme.palette.primary.dark};
  }
  @media (hover: none) {
    && {
      background: ${props => !props.active ? props.theme.palette.background.paper : props.theme.palette.primary.main};
    }
  }
  &:nth-child(n+4){
    margin-top: 0.5rem;
  }
`

export const Servers = styled.div`
  background: ${props => props.theme.palette.background.default};
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
`

export const Divider = styled(MuiDivider)`
  margin: 0.75rem 0.25rem;
  height: 0.15rem;
`

export const Rooms = styled.div`
  width: 15rem;
  margin: 0.6rem;
  display: flex;
  flex-direction: column;
`