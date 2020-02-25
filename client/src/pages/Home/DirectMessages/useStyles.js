import styled from "styled-components"
import { Button as MuiButton, ListItem as MuiListItem } from "@material-ui/core"
import grey from "@material-ui/core/colors/grey"

export const RoomName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 500;
`

export const ListItem = styled(MuiListItem)`
  border-radius: 0.25rem;
`

export const Button = styled(MuiButton)`
  margin: 0 0.5rem 1rem 0.5rem;
  color: white;
  background-color: ${grey[900]};
  &:hover {
    background-color: ${grey[700]};
  }
  @media (hover: none) {
    && {
      background: ${grey[900]};
    }
  }
`