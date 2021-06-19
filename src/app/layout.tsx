import React, { ReactElement } from 'react'
import styled from 'styled-components'

type LayoutProps = {
  main: ReactElement
  side: ReactElement
}

export const Layout = (props: LayoutProps) => {
  const { main, side } = props
  return (
    <Container>
      <Main>{main}</Main>
      <Side>{side}</Side>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
`

const Main = styled.div`
  flex-grow: 1;
`

const Side = styled.div`
  width: 400px;
  flex-shrink: 0;
  background-color: seashell;
`
