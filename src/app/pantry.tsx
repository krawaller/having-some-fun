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
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  padding-left: 0;
`

const Purchaser = styled.li`
  list-style-type: none;
  & > button {
    all: unset;
    cursor: pointer;
    user-select: none;
    background-color: green;
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 40px;
    text-align: center;
    transition: font-size 0.3s ease;
    &:hover {
      font-size: 50px;
      &:after {
        border-top-width: 40px;
      }
    }
    &:after {
      display: block;
      content: ' ';
      position: absolute;
      border: 30px solid transparent;
      transition: border-top-width 0.3s ease;
      border-bottom-width: 0;
      border-top-width: 20px;
      border-top-color: green;
    }
  }
`
