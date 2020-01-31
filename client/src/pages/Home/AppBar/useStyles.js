import styled from "styled-components"
import { Typography } from "@material-ui/core"

export const Buttons = styled.div`
  margin-left: auto;
`

export const Title = styled(Typography)`
  cursor: pointer;
  ${props => props.theme.breakpoints.up("sm")} {
    padding-left: 0.75rem;
  }
`