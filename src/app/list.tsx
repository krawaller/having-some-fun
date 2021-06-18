import React from 'react'
import styled from 'styled-components'
import { Meta } from '../data/types'
import { InventoryActions, InventoryState } from '../state/inventory'

type ListProps = {
  state: InventoryState
  actions: InventoryActions
  meta: Meta
}

export const List = (props: ListProps) => {
  const { state, actions, meta } = props
  return (
    <>
      <Container>
        {state.score.items.map((item, idx) => (
          <Item key={idx}>
            <Icon>{meta.items[item.name].emoji}</Icon>
            <Score>
              <div>{item.points}</div>
              <div>{item.bonus}</div>
            </Score>
            <RemoveButton onClick={() => actions.removeAt(idx)}>X</RemoveButton>
          </Item>
        ))}
      </Container>
      <button onClick={() => actions.purge()}>Clear</button>
    </>
  )
}

const Container = styled.ul`
  padding-left: 0;
  padding: 12px;
`

const Item = styled.li`
  --item-size: 80px;
  --item-radius: 6px;
  list-style-type: none;
  background-color: gray;
  border-radius: var(--item-radius);
  margin: 6px;
  display: inline-flex;
  flex-direction: column;
  position: relative;
  height: 80px;
  width: 80px;
  &:hover button {
    transform: scale(1, 1);
  }
`

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: calc(var(--item-size) / 2);
`

const Score = styled.div`
  display: flex;
  height: calc(var(--item-size) / 4);
  text-align: center;
  & :first-child {
    border-bottom-left-radius: var(--item-radius);
    background-color: lightgray;
    flex-grow: 1;
  }
  & :last-child {
    border-bottom-right-radius: var(--item-radius);
    flex-grow: 1;
    background-color: black;
    color: white;
  }
`

const RemoveButton = styled.button`
  --remove-button-size: calc(var(--item-size) / 4);
  all: unset;
  cursor: pointer;
  font-family: monospace;
  user-select: none;
  transition: transform 0.3s ease;
  transform: scale(0, 0);
  height: var(--remove-button-size);
  width: var(--remove-button-size);
  border-radius: var(--item-size);
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
  top: calc(var(--remove-button-size) * -0.35);
  right: calc(var(--remove-button-size) * -0.35);
`
