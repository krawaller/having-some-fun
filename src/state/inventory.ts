import { atom, Atom } from 'klyva'
import { teller, TellerResult, typeTotals, Catalog, Name } from '../data'

// We need to be able to identify a specific item in our inventory, so
// we track each item along with a unique id
type IdInventory<C extends Catalog> = { item: Name<C>; key: number }[]

let key = 0

export const makeInventory = <C extends Catalog>(
  catalog: C,
  initial?: Name<C>[]
) => {
  const rawInventoryAtom = atom<IdInventory<C>>(
    initial?.map((item) => ({ item, key: key++ })) ?? []
  )
  const actions = makeActions(rawInventoryAtom)
  const inventoryAtom = atom((read) => {
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
  return { actions, inventoryAtom }
}

export type InventoryState = ReturnType<
  ReturnType<typeof makeInventory>['inventoryAtom']['getValue']
>

export type InventoryActions = ReturnType<typeof makeActions>

// Inner helper that creates a UI actions object for the given inventory atom.

const makeActions = <C extends Catalog>(inventory: Atom<IdInventory<C>>) => ({
  /**
   * Adds an <item> to the end of the inventory list
   */
  add: (item: Name<C>) => {
    inventory.update((inv) => inv.concat({ item, key: key++ }))
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

const findLastIndex = <T>(
  arr: Array<T>,
  predicate: (value: T, index: number, obj: T[]) => boolean
): number => {
  let l = arr.length
  while (l--) {
    if (predicate(arr[l], l, arr)) return l
  }
  return -1
}
