import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { teller } from '../teller'
import { Catalog } from '../types'

const basicTestCatalog: Catalog<'regular1' | 'regular2'> = {
  regular1: {
    points: 1,
  },
  regular2: {
    points: 2,
  },
}

const basicSuite = suite('Teller, basic items')

basicSuite('we get correct totals', () => {
  const result = teller(basicTestCatalog, ['regular1', 'regular2', 'regular2'])
  assert.is(result.points, 5)
  assert.is(result.bonus, 0)
})

basicSuite('we get correct item descriptors', () => {
  const result = teller(basicTestCatalog, ['regular1', 'regular2'])
  assert.equal(result.items[0], { name: 'regular1', points: 1, bonus: 0 })
  assert.equal(result.items[1], { name: 'regular2', points: 2, bonus: 0 })
})

basicSuite.run()
