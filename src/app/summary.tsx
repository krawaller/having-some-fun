import React from 'react'
import styled from 'styled-components'
import { Catalog, Meta } from '../data/types'
import { InventoryActions, InventoryState } from '../state/inventory'

type SummaryProps = {
  state: InventoryState
  actions: InventoryActions
  catalog: Catalog
  meta: Meta
}

export const Summary = (props: SummaryProps) => {
  const { state, actions, catalog, meta } = props
  return (
    <>
      <Container>
        {Object.keys(catalog).map((item) => {
          const points = state.items.reduce(
            (acc, i) => acc + (i.name === item ? i.points : 0),
            0
          )
          const bonus = state.items.reduce(
            (acc, i) => acc + (i.name === item ? i.bonus : 0),
            0
          )
          return (
            <Line key={item}>
              <Icon>{meta.items[item].emoji}</Icon> ⋅ {state.count[item] ?? 0}
              <AddButton onClick={() => actions.add(item)}>+</AddButton>
              <RemoveButton
                onClick={() => actions.remove(item)}
                disabled={!state.count[item]}
              >
                x
              </RemoveButton>
              <Score>
                <div>{points}</div>
                <div>{bonus}</div>
              </Score>
            </Line>
          )
        })}
      </Container>
      <button onClick={() => actions.purge()}>Clear</button>
    </>
  )
}

const Container = styled.ul`
  margin-top: 0;
`

const Line = styled.li`
  list-style-type: none;
  height: 30px;
  margin-bottom: 5px;
  border-radius: 15px;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
`

const Icon = styled.span`
  margin: 0 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
`

const CircleButton = styled.button`
  all: unset;
  border-radius: 25px;
  height: 25px;
  width: 25px;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
  &:disabled {
    opacity: 0.4;
  }
`

const AddButton = styled(CircleButton)`
  background-color: green;
`

const RemoveButton = styled(CircleButton)`
  background-color: red;
  color: white;
`

const Score = styled.div`
  display: flex;
  width: 120px;
  height: 100%;
  text-align: center;
  line-height: 100%;
  align-items: stretch;
  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & :first-child {
    background-color: lightgray;
    flex-grow: 1;
    flex-shrink: 0;
  }
  & :last-child {
    flex-grow: 1;
    flex-shrink: 0;
    background-color: black;
    color: white;
  }
`
