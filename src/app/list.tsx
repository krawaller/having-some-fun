import React from 'react'
import { InventoryActions, InventoryState } from '../state/inventory'

type ListProps = {
  state: InventoryState
  actions: InventoryActions
}

export const List = (props: ListProps) => {
  const { state, actions } = props
  return (
    <>
      <h4>List of current inventory</h4>
      <ul>
        {state.score.items.map((item, idx) => (
          <li key={idx}>
            {item.name} ({item.points} points, {item.bonus} bonus)
            <button onClick={() => actions.removeAt(idx)}>X</button>
          </li>
        ))}
      </ul>
      <button onClick={() => actions.purge()}>Clear</button>
    </>
  )
}
