import { suite } from 'uvu'
import * as assert from 'uvu/assert'

import { teller } from '../teller'
import { Catalog } from '../types'

const solitaireTestCatalog: Catalog<'solitaire' | 'regular'> = {
  regular: {
    points: 1,
  },
  solitaire: {
    points: 1,
    bonus: {
      type: 'solitaire',
      points: 10,
    },
  },
}

const solitaireSuite = suite('Teller, solitaire bonus items')

solitaireSuite('when just 1 solitaire item', () => {
  const result = teller(solitaireTestCatalog, [
    'regular',
    'solitaire',
    'regular',
  ])
  assert.is(result.bonus, 10, 'we get solitaire bonus')
})

solitaireSuite('when more than 1 solitaire item', () => {
  const result = teller(solitaireTestCatalog, ['solitaire', 'solitaire'])
  assert.is(result.bonus, 0, 'we get no solitaire bonus')
})

solitaireSuite.run()
