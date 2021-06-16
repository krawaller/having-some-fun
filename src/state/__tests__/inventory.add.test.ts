import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { Catalog } from '../../data/types'
import { makeInventory } from '../inventory'

const catalog: Catalog<'regular' | 'pair'> = {
  regular: {
    name: 'regular',
    points: 1,
  },
  pair: {
    name: 'pair',
    points: 1,
    bonus: {
      type: 'group',
      groupSize: 2,
      points: 3,
    },
  },
}

const invSuite = suite('Stateful inventory, adding')

invSuite('adding items', () => {
  const { actions, inventoryAtom } = makeInventory(catalog, ['pair'])
  actions.add('regular')
  actions.add('pair')
  const result = inventoryAtom.getValue()
  assert.equal(result.inventory, ['pair', 'regular', 'pair'])
})

invSuite.run()
