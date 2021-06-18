import React from 'react'
import styled from 'styled-components'
import { Catalog, Meta, Name } from '../data/types'
import { InventoryActions } from '../state/inventory'

type PantryProps<C extends Catalog> = {
  catalog: C
  meta: Meta<C>
  actions: InventoryActions
}

export const Pantry = <C extends Catalog>(props: PantryProps<C>) => {
  const { catalog, actions, meta } = props
  const all = Object.keys(catalog) as Name<C>[]
  return (
    <Container>
      {all.map((item) => (
        <Purchaser key={item}>
          <button onClick={() => actions.add(item)}>
            {meta.items[item].emoji}
          </button>
        </Purchaser>
      ))}
    </Container>
  )
}

const Container = styled.ul`
  --purchaser-size: 60px;
  display: flex;
  justify-content: space-around;
  margin-bottom: calc(var(--purchaser-size) * 0.6);
  padding-left: 0;
`

const Purchaser = styled.li`
  list-style-type: none;
  & > button {
    all: unset;
    cursor: pointer;
    user-select: none;
    background-color: green;
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
      transition: border-top-width 0.3s ease;
      border-bottom-width: 0;
      border-top-width: calc(
        var(--purchaser-size) * 0.25
      ); /* Idle arrow height */
      border-top-color: green;
    }
  }
`
