import React from 'react'
import { Simulate } from 'react-dom/test-utils'
import { render } from '@testing-library/react'
import * as assert from 'uvu/assert'
import { catalog, meta } from './simple-test-data'
import { GamePoints } from '../gamepoints'
import { domTestSuite } from './dom-test-suite'

const GPSuite = domTestSuite('the GamePoints component, purchasing')

GPSuite('we start with nothing', () => {
  const wrapper = render(<GamePoints catalog={catalog} meta={meta} />)
  const list = wrapper.getByTitle('backpack')
  assert.is(list.querySelectorAll('li').length, 0)
})

GPSuite('we can purchase items', async () => {
  const wrapper = render(<GamePoints catalog={catalog} meta={meta} />)

  const alienBtn = wrapper.getByTitle('Acquire alien')
  Simulate.click(alienBtn)
  const aliens = await wrapper.findAllByTitle('Acquired alien')
  assert.is(aliens.length, 1)

  const clownBtn = wrapper.getByTitle('Acquire clown')
  Simulate.click(clownBtn)
  Simulate.click(clownBtn)
  const clowns = await wrapper.findAllByTitle('Acquired clown')
  assert.is(clowns.length, 2)
})

GPSuite.run()
