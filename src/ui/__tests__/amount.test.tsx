import React from 'react'
import { Simulate } from 'react-dom/test-utils'
import { render, waitFor } from '@testing-library/react'
import * as assert from 'uvu/assert'

import { catalog, meta } from './simple-test-data'
import { GamePoints } from '../gamepoints'
import { domTestSuite } from './dom-test-suite'

const GPSquite = domTestSuite('the GamePoints component, changing type amounts')

GPSquite('we can increase amounts via the summary', async () => {
  const wrapper = render(<GamePoints catalog={catalog} meta={meta} />)

  const getClownBtn = wrapper.getByTitle('Acquire clown')
  Simulate.click(getClownBtn) // Subsequent inc/dec alien shouldn't affect this

  const getAlienBtn = wrapper.getByTitle('Acquire alien')
  Simulate.click(getAlienBtn)
  Simulate.click(getAlienBtn)
  await waitFor(() =>
    assert.is(wrapper.queryAllByTitle('Acquired alien').length, 2)
  )

  const incAlienBtn = wrapper.getByTitle('Increase alien count')
  Simulate.click(incAlienBtn)
  await waitFor(() =>
    assert.is(wrapper.queryAllByTitle('Acquired alien').length, 3)
  )

  const decAlienBtn = wrapper.getByTitle('Decrease alien count')
  Simulate.click(decAlienBtn)
  Simulate.click(decAlienBtn)
  await waitFor(() =>
    assert.is(wrapper.queryAllByTitle('Acquired alien').length, 1)
  )

  await waitFor(() =>
    assert.is(wrapper.queryAllByTitle('Acquired clown').length, 1)
  )
})

GPSquite.run()
