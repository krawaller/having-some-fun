import { Atom } from 'klyva'
import { Catalog, Name } from '../data'
import { findLastIndex, getId, IdInventory } from './utils'

// Inner helper that creates a UI actions object which mutates the given inventory atom.
export const makeActions = <C extends Catalog>(
  inventory: Atom<IdInventory<C>>
) => ({
  /**
   * Adds an <item> to the end of the inventory list
   */
  add: (item: Name<C>) => {
    inventory.update((inv) => inv.concat({ item, key: getId() }))
  },
  /**
   * Removes the last occurence of <item> in the inventory, if any
   */
  remove: (item: Name<C>) => {
    inventory.update((inv) => {
      const lastIdx = findLastIndex(inv, (i) => i.item === item)
      return lastIdx === -1
        ? inv
        : [...inv.slice(0, lastIdx), ...inv.slice(lastIdx + 1)]
    })
  },
  /**
   * Removes the item at <idx>
   */
  removeAt: (idx: number) => {
    inventory.update((inv) => [...inv.slice(0, idx), ...inv.slice(idx + 1)])
  },
  /**
   * Purges the entire inventory
   */
  purge: () => inventory.update([]),
})
