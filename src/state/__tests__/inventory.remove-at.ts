import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { Catalog } from '../../data'
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

const invSuite = suite('Stateful inventory, removing at idx')

invSuite('removing items', () => {
  const { actions, inventoryAtom } = makeInventory(catalog, [
    'pair',
    'regular',
    'pair',
  ])
  actions.removeAt(1)
  const result = inventoryAtom.getValue()
  assert.equal(result.inventory, ['pair', 'pair'])
})

invSuite.run()
