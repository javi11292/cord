import styled, { keyframes, css } from "styled-components"
import { SnackbarContent as MuiSnackbarContent } from "@material-ui/core"

const color = props => keyframes`
  0%, 100% {
    background-color: ${props.theme.palette.secondary.dark};
  }

  50% {
    background-color: ${props.theme.palette.error.dark};
  }
`

export const SnackbarContent = styled(MuiSnackbarContent)`
  background-color: ${props => props.theme.palette.secondary.dark};
  color: inherit;
  ${props => css`animation: ${color(props)} 2s ease-out infinite;`}
`

export const Video = styled.video`
  width: 50%;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: 2rem;
  z-index: ${props => props.theme.zIndex.drawer + 1};
`