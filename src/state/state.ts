import { atom, Atom } from 'klyva'
import { Catalog, Name, teller, TellerResult, typeTotals } from '../data'
import { IdInventory } from './utils'

// Inner helper that creates a computed atom massaged for the UI.
// This atom is not writable, instead it is updated indirectly via the actions
export const makeState = <C extends Catalog>(
  rawInventoryAtom: Atom<IdInventory<C>>,
  catalog: C
) => {
  return atom((read) => {
    const idInventory = read(rawInventoryAtom)
    const inventory = idInventory.map((i) => i.item)
    const types = Object.keys(catalog) as Name<C>[]
    const { bonus, items, points } = teller(catalog, inventory)
    return {
      // raw list of items
      inventory,
      // total points and bonus
      points,
      bonus,
      // list of items, each with score info and unique ID
      items: items.map((i, n) => ({
        ...i,
        key: idInventory[n].key,
      })),
      // total type counts (useful for disabling remove buttons in UI and showing "cart lines")
      count: typeTotals(inventory),
      // cute cheap feature: show potential new scores for subsequent purchase per item
      if: types.reduce((acc, item) => {
        acc[item] = teller(catalog, inventory.concat(item))
        return acc
      }, {} as { [key in Name<C>]: TellerResult<C> }),
    }
  })
}
