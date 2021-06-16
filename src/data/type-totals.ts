import { Catalog, Inventory, Name } from './types'

type TypeTotals<C extends Catalog> = Record<Name<C>, number>

export const typeTotals = <C extends Catalog>(inventory: Inventory<C>) =>
  inventory.reduce((memo, item) => {
    memo[item] = (memo[item] ?? 0) + 1
    return memo
  }, {} as unknown as TypeTotals<C>)
