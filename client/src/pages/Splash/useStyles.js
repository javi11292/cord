import styled, { keyframes } from "styled-components"
import Logo from "@material-ui/icons/AllInclusive"

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  font-size: 7rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Icon = styled(Logo)`
  animation: ${rotate} 1s;
  margin-bottom: 1rem;
`