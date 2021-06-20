import React from 'react'
import {
  Transition,
  TransitionGroup,
  TransitionStatus,
} from 'react-transition-group'
import styled from 'styled-components'
import { Meta } from '../data'
import { InventoryActions, InventoryState } from '../state'
import { Score } from './score'

/*
The List shows all individual items, and how much each one provides in points and bonus.
(not featured in original sketch)
*/

type ListProps = {
  state: InventoryState
  actions: InventoryActions
  meta: Meta
}

export const List = (props: ListProps) => {
  const { state, actions, meta } = props
  return (
    <Container title="backpack" component="ul">
      {state.items.map((item, idx) => (
        <Transition key={item.key} timeout={{ enter: 0, exit: 300 }}>
          {(state) => (
            <Item state={state} title={`Acquired ${item.name}`}>
              <Icon>{meta.items[item.name].emoji}</Icon>
              <ScoreBox>
                <Score points={item.points} bonus={item.bonus} />
              </ScoreBox>
              <RemoveButton
                onClick={() => actions.removeAt(idx)}
                title={`Remove ${item.name}`}
              >
                X
              </RemoveButton>
            </Item>
          )}
        </Transition>
      ))}
    </Container>
  )
}

const Container = styled(TransitionGroup)`
  padding-left: 0;
  padding: 12px;
`

const Item = styled.li<{ state: TransitionStatus }>`
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
  transition: opacity 0.2s ease, transform 0.2s ease;
  &:hover button {
    transform: scale(1, 1);
  }
  ${({ state }) =>
    (state === 'exiting' || state === 'entering') &&
    `
    transform: scale(0, 0);
    opacity: 0;
  `}
`

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: calc(var(--item-size) / 2);
`

const ScoreBox = styled.div`
  height: calc(var(--item-size) / 4);
  position: relative;
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
