import React from 'react'
import { Simulate } from 'react-dom/test-utils'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import { catalog, meta } from './simple-test-data'
import { GamePoints } from '../gamepoints'
import { domTestSuite } from './dom-test-suite'

const GPSquite = domTestSuite('the GamePoints component, deleting items')

GPSquite('we can delete purchased items', async () => {
  const wrapper = render(<GamePoints catalog={catalog} meta={meta} />)

  const alienBtn = wrapper.getByTitle('Acquire alien')
  Simulate.click(alienBtn)
  const alienItem = await wrapper.findByTitle('Acquired alien')
  const deleteBtn = await wrapper.findByTitle('Remove alien')
  Simulate.click(deleteBtn)
  waitForElementToBeRemoved(alienItem)
})

GPSquite.run()
