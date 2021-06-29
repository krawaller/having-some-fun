import { atom } from 'klyva'
import { Catalog, Name } from '../data'
import { makeActions } from './actions'
import { makeState } from './state'
import { getId, IdInventory } from './utils'

export const makeInventory = <C extends Catalog>(
  catalog: C,
  initial?: Name<C>[]
) => {
  const rawInventoryAtom = atom<IdInventory<C>>(
    initial?.map((item) => ({ item, key: getId() })) ?? []
  )
  const actions = makeActions(rawInventoryAtom)
  const inventoryAtom = makeState(rawInventoryAtom, catalog)
  return { actions, inventoryAtom }
}

export type InventoryState = ReturnType<
  ReturnType<typeof makeState>['getValue']
>

export type InventoryActions = ReturnType<typeof makeActions>
