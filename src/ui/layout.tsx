import React, { ReactElement, useState } from 'react'
import styled, { css } from 'styled-components'

/*
A helper component to house the layout styling and logic. It will toggle between horisontal and
vertical layout depending on screen width. When in vertical mode the `side` content is instead
rendered at the bottom and can be shown/hidden with a toggler.
*/

type LayoutProps = {
  main: ReactElement
  side: ReactElement
}

export const Layout = (props: LayoutProps) => {
  const { main, side } = props
  const [showSidebar, setShowSidebar] = useState(true)
  return (
    <Container>
      <Main>{main}</Main>
      <Side showSidebar={showSidebar}>
        <SideToggler
          onClick={() => setShowSidebar(!showSidebar)}
          title="Toggle summary"
        >
          {showSidebar ? '⬇️' : '⬆️'}
        </SideToggler>
        <SideContent>{side}</SideContent>
      </Side>
    </Container>
  )
}

// Can't use CSS variables in media queries, and didn't want to add CSS pre-processing just to do
// custom env() variables, so simply opted to have breakpoint in JS.
const breakPoint = 700

const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
  @media (max-width: ${breakPoint - 1}px) {
    flex-direction: column;
  }
`

const Main = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: auto;
`

const Side = styled.div<{ showSidebar: boolean }>`
  --toggler-size: 40px;
  --side-gradient-start: sandybrown;
  --side-gradient-stop: #f1c8a6;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  @media (max-width: ${breakPoint - 1}px) {
    overflow: hidden;
    transition: max-height 0.3s ease;
    ${(ctx) =>
      ctx.showSidebar
        ? css`
            max-height: 100vh;
          `
        : css`
            max-height: var(--toggler-size);
          `};
  }
  @media (min-width: ${breakPoint}px) {
    width: 300px;
  }
`

const SideToggler = styled.button`
  all: unset;
  cursor: pointer;
  align-self: flex-end;
  flex-shrink: 0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: var(--side-gradient-start);
  margin-right: 10px;
  height: var(--toggler-size);
  width: var(--toggler-size);
  text-align: center;
  font-size: calc(var(--toggler-size) / 2);
  @media (min-width: ${breakPoint}px) {
    display: none;
  }
`

const SideContent = styled.div`
  flex-grow: 1;
  padding: 6px;
  background: linear-gradient(
    var(--side-gradient-start),
    var(--side-gradient-stop)
  );
`
