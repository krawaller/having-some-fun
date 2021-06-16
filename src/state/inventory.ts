import { atom, Atom } from 'klyva'
import { teller, TellerResult } from '../data/teller'
import { typeTotals } from '../data/type-totals'
import { Catalog, Name } from '../data/types'

export const makeInventory = <C extends Catalog>(
  catalog: C,
  initial?: Name<C>[]
) => {
  const rawInventoryAtom = atom(initial ?? [])
  const actions = makeActions(rawInventoryAtom)
  const inventoryAtom = atom((read) => {
    const inventory = read(rawInventoryAtom)
    const types = Object.keys(catalog) as Name<C>[]
    return {
      // raw list of items
      inventory,
      // info about score & bonus, both total and per item
      score: teller(catalog, inventory),
      // total type counts (useful for disabling remove buttons in UI and showing "cart lines")
      count: typeTotals(inventory),
      // cute cheap feature: show potential new scores for subsequent purchase per item
      if: types.reduce((acc, item) => {
        acc[item] = teller(catalog, inventory.concat(item))
        return acc
      }, {} as { [key in Name<C>]: TellerResult<C> }),
    }
  })
  return { actions, inventoryAtom }
}

// Inner helper that creates a UI actions object for the given inventory atom.

const makeActions = <C extends Catalog>(inventory: Atom<Name<C>[]>) => ({
  /**
   * Adds an <item> to the end of the inventory list
   */
  add: (item: Name<C>) => {
    inventory.update((inv) => inv.concat(item))
  },
  /**
   * Removes the last occurence of <item> in the inventory, if any
   */
  remove: (item: Name<C>) => {
    inventory.update((inv) => {
      const lastIdx = inv.lastIndexOf(item)
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
