import React from "react"
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

export const SnackbarContent = styled(({ variant, ...props }) => <MuiSnackbarContent {...props} />)`
  background-color: ${props => props.variant === "connection" ? props.theme.palette.primary.dark : props.theme.palette.secondary.dark};
  color: inherit;
  ${props => props.variant !== "connection"
    ? css`animation: ${color(props)} 2s ease-out infinite;`
    : undefined
  }
`