import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { Catalog } from '../../data'
import { makeInventory } from '../inventory'

const catalog: Catalog<'regular'> = {
  regular: {
    points: 1,
  },
}

const invSuite = suite('Stateful inventory, purging')

invSuite('purging items', () => {
  const { actions, inventoryAtom } = makeInventory(catalog, [
    'regular',
    'regular',
  ])
  actions.purge()
  const result = inventoryAtom.getValue()
  assert.equal(result.inventory, [])
  assert.is(result.points, 0)
})

invSuite.run()
