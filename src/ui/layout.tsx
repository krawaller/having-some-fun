import React, { ReactElement } from 'react'
import styled from 'styled-components'

/*
A helper component to house the layout styling and logic
*/

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
  width: 300px;
  flex-shrink: 0;
  background-color: seashell;
`
