import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { teller } from '../teller'
import { Catalog } from '../types'

const ladderTestCatalog: Catalog<'ladder' | 'regular'> = {
  regular: {
    points: 1,
  },
  ladder: {
    points: 1,
    bonus: {
      type: 'ladder',
      steps: 4, // we'll get: bonus * 0, bonus * 1, bonus * 2, bonus * 3, and then it will repeat
      points: 4,
    },
  },
}

const ladderSuite = suite('Teller, ladder bonus items')

ladderSuite('when just 1 ladder item', () => {
  const result = teller(ladderTestCatalog, ['regular', 'ladder', 'regular'])
  assert.is(result.bonus, 0, 'we get no bonus')
})

ladderSuite('when a full ladder', () => {
  const result = teller(ladderTestCatalog, [
    'ladder', // bonus * 0
    'ladder', // bonus * 1
    'ladder', // bonus * 2
    'regular',
    'ladder', // bonus * 3
    'ladder', // bonus * 0 (since new ladder)
  ])
  assert.is(result.items[0].bonus, 0)
  assert.is(result.items[1].bonus, 4)
  assert.is(result.items[2].bonus, 8)
  assert.is(result.items[4].bonus, 12)
  assert.is(result.items[5].bonus, 0)
  assert.is(result.bonus, 6 * 4, 'we get a total of 6 ladder bonuses')
})

ladderSuite.run()
