import styled from "styled-components"

export const Box = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
`

export const Frame = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
`

export const Content = styled.div`
  overflow: auto;
`