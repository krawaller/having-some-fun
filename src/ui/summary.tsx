import React from 'react'
import styled from 'styled-components'
import { Catalog, Meta } from '../data'
import { InventoryActions, InventoryState } from '../state'
import { Score } from './score'

/*
The Summary component is the right-hand side of the app, called "Player Items" in the original sketch.
It shows point and bonus totals per item type as requested, and also have type inc/dec buttons to
add/remove an item of that particular type.
*/

type SummaryProps = {
  state: InventoryState
  actions: InventoryActions
  catalog: Catalog
  meta: Meta
}

export const Summary = (props: SummaryProps) => {
  const { state, actions, catalog, meta } = props
  const { items, count, points, bonus, inventory } = state
  return (
    <>
      <Container>
        {Object.keys(catalog).map((item) => {
          const points = items.reduce(
            (acc, i) => acc + (i.name === item ? i.points : 0),
            0
          )
          const bonus = items.reduce(
            (acc, i) => acc + (i.name === item ? i.bonus : 0),
            0
          )
          return (
            <Line key={item}>
              <Count>
                <Icon>{meta.items[item].emoji}</Icon> ⋅ {count[item] ?? 0}
              </Count>
              <div>
                <AddButton onClick={() => actions.add(item)}>+</AddButton>{' '}
                <RemoveButton
                  onClick={() => actions.remove(item)}
                  disabled={!count[item]}
                >
                  x
                </RemoveButton>
              </div>
              <ScoreBox>
                <Score points={points} bonus={bonus} />
              </ScoreBox>
            </Line>
          )
        })}
        <Line>
          <span>Total</span>
          <button
            title="Remove all"
            disabled={!inventory.length}
            onClick={() => actions.purge()}
          >
            Clear
          </button>
          <ScoreBox>
            <Score points={points} bonus={bonus} />
          </ScoreBox>
        </Line>
      </Container>
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

const Count = styled.div`
  display: flex;
  align-items: center;
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

const ScoreBox = styled.div`
  width: 120px;
  align-self: stretch;
`
