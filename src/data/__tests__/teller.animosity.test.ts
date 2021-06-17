import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { teller } from '../teller'
import { Catalog } from '../types'

const animosityTestCatalog: Catalog<
  'regular' | 'animosity' | 'nemesis1' | 'nemesis2'
> = {
  regular: {
    points: 1,
  },
  nemesis1: {
    points: 1,
  },
  nemesis2: {
    points: 1,
  },
  animosity: {
    points: 1,
    bonus: {
      type: 'animosity',
      points: 5,
      unless: ['nemesis1', 'nemesis2'],
    },
  },
}

const animositySuite = suite('Teller, animosity bonus items')

animositySuite('with no nemesis', () => {
  const result = teller(animosityTestCatalog, [
    'animosity',
    'regular',
    'animosity',
  ])
  assert.is(result.bonus, 10, 'we get bonus for each animosity item')
})

animositySuite('with a nemesis', () => {
  const result = teller(animosityTestCatalog, [
    'animosity',
    'regular',
    'nemesis2',
  ])
  assert.is(result.bonus, 0, 'we get no animosity bonus')
})

animositySuite.run()
