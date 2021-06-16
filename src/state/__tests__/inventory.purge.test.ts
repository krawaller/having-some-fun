import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { Catalog } from '../../data/types'
import { makeInventory } from '../inventory'

const catalog: Catalog<'regular'> = {
  regular: {
    name: 'regular',
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
  assert.is(result.score.points, 0)
})

invSuite.run()
