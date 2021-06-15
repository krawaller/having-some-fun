import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { teller } from '../teller'
import { Catalog } from '../types'

const groupTestCatalog: Catalog<'triplet' | 'regular'> = {
  regular: {
    name: 'regular',
    points: 2,
  },
  triplet: {
    name: 'triplet',
    points: 1,
    bonus: {
      type: 'group',
      groupSize: 3,
      points: 5,
    },
  },
}

const groupSuite = suite('Teller, group bonus items')

groupSuite('when less than required amount', () => {
  const result = teller(groupTestCatalog, ['triplet', 'regular', 'triplet'])
  assert.is(result.points, 4)
  assert.is(result.bonus, 0, 'no bonus is provided')
})

groupSuite('when enough for 1 group', () => {
  const result = teller(groupTestCatalog, [
    'triplet',
    'triplet',
    'triplet', // 3rd item should give group bonus
    'triplet',
  ])
  assert.is(result.points, 4)
  assert.is(result.bonus, 5)
  assert.equal(
    result.items[2],
    { name: 'triplet', points: 1, bonus: 5 },
    '3rd triplet gave bonus'
  )
})

groupSuite('when enough for 2 groups', () => {
  const result = teller(groupTestCatalog, [
    'triplet',
    'triplet',
    'triplet', // 3rd item should give group bonus
    'triplet',
    'triplet',
    'triplet', // 3rd item should give group bonus
    'triplet',
  ])
  assert.is(result.points, 7)
  assert.is(result.bonus, 10)
  assert.equal(
    result.items[2],
    { name: 'triplet', points: 1, bonus: 5 },
    '3rd triplet gave bonus'
  )
  assert.equal(
    result.items[5],
    { name: 'triplet', points: 1, bonus: 5 },
    '6th triplet gave bonus'
  )
})

groupSuite.run()
