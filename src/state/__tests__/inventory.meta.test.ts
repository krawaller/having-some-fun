import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { Catalog } from '../../data/types'
import { makeInventory } from '../inventory'

const catalog: Catalog<'regular' | 'pair'> = {
  regular: {
    points: 1,
  },
  pair: {
    points: 1,
    bonus: {
      type: 'group',
      groupSize: 2,
      points: 3,
    },
  },
}

const invSuite = suite('Stateful inventory, meta')

invSuite('we get correct scores', () => {
  const { inventoryAtom } = makeInventory(catalog, ['pair', 'regular', 'pair'])
  const {
    score: { bonus, items, points },
  } = inventoryAtom.getValue()
  assert.is(points, 3)
  assert.is(bonus, 3)
  assert.is(items[0].points, 1)
  assert.is(items[2].bonus, 3)
})

invSuite('we get correct if statements', () => {
  const { inventoryAtom } = makeInventory(catalog, ['pair', 'regular'])
  const {
    if: { pair, regular },
  } = inventoryAtom.getValue()
  assert.is(pair.bonus, 3)
})

invSuite.run()
