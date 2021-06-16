import { typeTotals } from './type-totals'
import { Inventory, Catalog, Name } from './types'

export type TellerItem<C extends Catalog> = {
  name: Name<C>
  points: number
  bonus: number
}

export type TellerResult<C extends Catalog> = {
  items: TellerItem<C>[]
  points: number
  bonus: number
}

/**
 * The teller calculates total score for an inventory,
 * as well as individual scores per item
 */
export const teller = <C extends Catalog>(
  catalog: C,
  inventory: Inventory<C>
): TellerResult<C> => {
  const totals = typeTotals(inventory)
  const positions = itemPositions(inventory)
  return positions.reduce<TellerResult<C>>(
    (memo, itemPos) => {
      const points = catalog[itemPos.type].points
      const bonus = itemBonus(catalog, itemPos, totals)
      return {
        bonus: memo.bonus + bonus,
        points: memo.points + points,
        items: memo.items.concat({ points, bonus, name: itemPos.type }),
      }
    },
    { items: [], points: 0, bonus: 0 }
  )
}

// ------ Inner helper to calculate occurence index per type per item  --------

type ItemPos<C extends Catalog> = {
  type: Name<C>
  idx: number // The position in the inventory array
  sibling: number // Occurrence index for this type
}

const itemPositions = <C extends Catalog>(inventory: Inventory<C>) =>
  inventory.reduce<ItemPos<C>[]>((memo, type, idx) => {
    const prior = memo.filter((i) => i.type === type).length
    memo.push({ type, idx, sibling: prior + 1 })
    return memo
  }, [])

// ------- Inner helper to calculate item bonus --------

const itemBonus = <C extends Catalog>(
  catalog: C,
  itemPos: ItemPos<C>,
  totals: Record<string, number>
) => {
  const def = catalog[itemPos.type]
  const bonus = def.bonus
  switch (bonus?.type) {
    case 'group':
      return itemPos.sibling % bonus.groupSize ? 0 : bonus.points
    case 'solitaire':
      return totals[itemPos.type] === 1 ? bonus.points : 0
    case 'animosity':
      return bonus.unless.some((nemesis) => totals[nemesis] > 0)
        ? 0
        : bonus.points
    case 'ladder':
      return ((itemPos.sibling - 1) % bonus.steps) * bonus.points
    default:
      return 0
  }
}
