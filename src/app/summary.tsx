import React from 'react'
import { Catalog } from '../data/types'
import { InventoryActions, InventoryState } from '../state/inventory'

type SummaryProps = {
  state: InventoryState
  actions: InventoryActions
  catalog: Catalog
}

export const Summary = (props: SummaryProps) => {
  const { state, actions, catalog } = props
  return (
    <>
      <h4>Point and bonus summary</h4>
      <ul>
        {Object.keys(catalog).map((item) => (
          <li key={item}>
            {item} ({state.count[item] ?? 0}) (
            {state.items.reduce(
              (acc, i) => acc + (i.name === item ? i.points : 0),
              0
            )}{' '}
            points) (
            {state.items.reduce(
              (acc, i) => acc + (i.name === item ? i.bonus : 0),
              0
            )}
            bonus) <button onClick={() => actions.add(item)}>add</button>
            <button
              onClick={() => actions.remove(item)}
              disabled={!state.count[item]}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
