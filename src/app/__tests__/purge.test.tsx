import React from 'react'
import { Simulate } from 'react-dom/test-utils'
import { render, waitFor } from '@testing-library/react'
import * as assert from 'uvu/assert'
import { catalog, meta } from './simple-test-data'
import { GamePoints } from '../gamepoints'
import { domTestSuite } from './dom-test-suite'

const GPSuite = domTestSuite('the GamePoints component, purging')

GPSuite('we can purge all', async () => {
  const wrapper = render(<GamePoints catalog={catalog} meta={meta} />)

  const alienBtn = wrapper.getByTitle('Acquire alien')
  Simulate.click(alienBtn)
  Simulate.click(alienBtn)
  Simulate.click(alienBtn)
  assert.is((await wrapper.findAllByTitle('Acquired alien')).length, 3)

  const purgeBtn = wrapper.getByTitle('Remove all')
  Simulate.click(purgeBtn)
  waitFor(() => assert.is(wrapper.queryAllByTitle('Acquired alien').length, 0))
})

GPSuite.run()
