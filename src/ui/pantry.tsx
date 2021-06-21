import React from 'react'
import styled, { css } from 'styled-components'
import { Catalog, Meta, Name } from '../data'
import { InventoryActions, InventoryState } from '../state'
import { Score } from './score'

/*
The Pantry has a button per type, letting the player gain an item of that type. This
corresponds to the left-hand side of the sketch.
*/

type PantryProps<C extends Catalog> = {
  catalog: C
  meta: Meta<C>
  actions: InventoryActions
  state: InventoryState
}

export const Pantry = <C extends Catalog>(props: PantryProps<C>) => {
  const { catalog, actions, meta, state } = props
  const all = Object.keys(catalog) as Name<C>[]
  return (
    <Shelf>
      {all.map((item, n) => (
        <ProductContainer key={item}>
          <Hint left={n >= all.length / 2}>
            <Score
              points={state.if[item].points - state.points}
              bonus={state.if[item].bonus - state.bonus}
              signed
            />
          </Hint>
          <PurchaseButton
            onClick={() => actions.add(item)}
            title={`Acquire ${item}`}
          >
            {meta.items[item].emoji}
          </PurchaseButton>
        </ProductContainer>
      ))}
    </Shelf>
  )
}

const Shelf = styled.ul`
  --purchaser-size: 60px;
  display: flex;
  justify-content: space-around;
  margin-bottom: calc(var(--purchaser-size) * 0.6);
  padding-left: 0;
  margin-top: 0;
`

const Hint = styled.div<{ left: boolean }>`
  position: absolute;
  width: 50px;
  height: 20px;
  top: 10px;
  border-radius: 10px;
  overflow: hidden;
  opacity: 0; /* set to 1 by hover in parent */
  transition: opacity 0.3s ease;
  pointer-events: none;
  ${(p) =>
    p.left
      ? css`
          left: -70%;
        `
      : css`
          right: -70%;
        `}
`

const ProductContainer = styled.li`
  --gradient-start: #e66465;
  --gradient-stop: #9198e5;
  background: linear-gradient(var(--gradient-start), var(--gradient-stop));
  list-style-type: none;
  position: relative;
  &:hover > :first-child {
    opacity: 1;
  }
`

const PurchaseButton = styled.button`
  all: unset;
  cursor: pointer;
  user-select: none;
  width: var(--purchaser-size);
  height: var(--purchaser-size);
  line-height: var(--purchaser-size);
  font-size: calc(var(--purchaser-size) * 0.6);
  text-align: center;
  transition: font-size 0.1s ease;
  &:hover {
    &:after {
      border-top-width: calc(
        var(--purchaser-size) * 0.65
      ); /* Active arrow height */
    }
  }
  &:active {
    font-size: calc(var(--purchaser-size) * 0.8);
  }
  &:after {
    display: block;
    content: ' ';
    position: absolute;
    border: calc(var(--purchaser-size) / 2) solid transparent;
    transition: border-top-width 0.2s ease;
    border-bottom-width: 0;
    border-top-width: calc(
      var(--purchaser-size) * 0.25
    ); /* Idle arrow height */
    border-top-color: var(--gradient-stop);
  }
`
