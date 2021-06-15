import React from 'react'
import { render, getNodeText } from '@testing-library/react'
import * as assert from 'uvu/assert'

import { Comp } from '../comp'

import { domTestSuite } from './dom-test-suite'

const CompSuite = domTestSuite('the Comp component')

CompSuite('when rendering sums', () => {
  const wrapper = render(<Comp a={3} b={5} />)
  const sum = wrapper.getByTestId('sum')
  assert.is(getNodeText(sum), '8', 'seems to make sense')
})

CompSuite.run()
