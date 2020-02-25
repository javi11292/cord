import styled from "styled-components"
import { TextField as MuiTextField } from "@material-ui/core"

export const Box = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
`

export const Frame = styled.div`
  ${props => props.theme.breakpoints.up("sm")} {
    grid-template-columns: auto 1fr;
  }
  display: grid;
  overflow: auto;
`

export const Content = styled.div`
  overflow: auto;
  display: grid;
  grid-template-rows: 1fr auto;
`

export const Messages = styled.div`

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