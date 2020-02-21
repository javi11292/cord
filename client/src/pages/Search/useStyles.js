import styled from "styled-components"
import { Container, TextField as MuiTextField } from "@material-ui/core"
import grey from "@material-ui/core/colors/grey"

export const Box = styled(Container)`
  display: flex;
  flex-direction: column;
`

export const Input = styled.div`
  display: flex;
  padding: 0.4rem;
  background: ${grey[700]};
  border-radius: 0.3rem;
  margin: 1rem 0;
`

export const TextField = styled(MuiTextField)`
  flex: 1;
  margin: 0;
`