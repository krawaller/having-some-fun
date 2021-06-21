import React from 'react'
import styled from 'styled-components'

type ScoreProps = {
  points: number
  bonus: number
  signed?: boolean
}

export const Score = (props: ScoreProps) => {
  const { bonus, points, signed } = props
  return (
    <ScoreLayout>
      <div title="points">
        {points >= 0 && signed ? '+' : ''}
        {points}
      </div>
      <div title="bonus">
        {bonus >= 0 && signed ? '+' : ''}
        {bonus}
      </div>
    </ScoreLayout>
  )
}

const ScoreLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  & > * {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > :first-child {
    border-bottom-left-radius: var(--item-radius);
    background-color: lightgray;
  }
  & > :last-child {
    border-bottom-right-radius: var(--item-radius);
    background-color: black;
    color: white;
  }
`
