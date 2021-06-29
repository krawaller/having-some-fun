import { Catalog, Name } from '../data'

// Minimal unique id factory
let id = 0
export const getId = () => ++id

// We need to be able to identify a specific item in our inventory, so
// we track each item along with a unique id
export type IdInventory<C extends Catalog> = { item: Name<C>; key: number }[]

// Array helper while we wait for https://github.com/tc39/proposal-array-find-from-last
export const findLastIndex = <T>(
  arr: Array<T>,
  predicate: (value: T, index: number, obj: T[]) => boolean
): number => {
  let l = arr.length
  while (l--) {
    if (predicate(arr[l], l, arr)) return l
  }
  return -1
}
