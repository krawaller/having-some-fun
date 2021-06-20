import React from 'react'
import styled from 'styled-components'

type ScoreProps = {
  points: number
  bonus: number
}

export const Score = (props: ScoreProps) => {
  const { bonus, points } = props
  return (
    <ScoreLayout>
      <div title="points">{points}</div>
      <div title="bonus">{bonus}</div>
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
