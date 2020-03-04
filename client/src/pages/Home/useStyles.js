import React from "react"
import styled from "styled-components"
import { TextField as MuiTextField, Paper, IconButton as MuiIconButton } from "@material-ui/core"
import grey from "@material-ui/core/colors/grey"

export const Box = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  overflow: hidden;
`

export const Frame = styled.div`
  ${props => props.theme.breakpoints.up("sm")} {
    grid-template-columns: auto 1fr;
  }
  display: grid;
  overflow: hidden;
`

export const IconButton = styled(MuiIconButton)`
  padding: 0.5rem;
`

export const Content = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr auto;
`

export const Messages = styled.div`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  word-break: break-all;
  margin: 0.25rem;
`

export const Message = styled(({ local, ...props }) => <Paper {...props} />)`
  max-width: 90%;
  margin: 0.25rem;
  padding: 0.75rem;
  display: inline;
  position: relative;
  background: ${props => props.local ? props.theme.palette.primary.dark : undefined};
  align-self: ${props => props.local ? "flex-end" : "flex-start"};
`

export const InfoPlaceholder = styled.span`
  width: 5rem;
  display: inline-block;
`

export const Info = styled.span`
  position: absolute;
  bottom: 0.4rem;
  right: 0.4rem;
  font-size: 0.75em;
  color: ${grey[300]};
`

export const TextField = styled(MuiTextField)`
  margin: 0;
  & .MuiInputBase-root {
    border-radius:0;
  }
  & .MuiInputBase-input {
    padding: 0.75rem 1rem;
  }
`