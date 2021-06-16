import React from 'react'
import { Catalog } from '../data/types'
import { InventoryActions } from '../state/inventory'

type PantryProps = {
  catalog: Catalog
  actions: InventoryActions
}

export const Pantry = (props: PantryProps) => {
  const { catalog, actions } = props
  return (
    <>
      <h4>Pantry</h4>
      {Object.keys(catalog).map((item) => (
        <button key={item} onClick={() => actions.add(item)}>
          {item}
        </button>
      ))}
    </>
  )
}
