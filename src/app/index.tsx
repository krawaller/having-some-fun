import React from 'react'
import { render } from 'react-dom'
import { Catalog } from '../data/types'
import { App } from './app'

const catalog: Catalog<'regular' | 'pair' | 'snob' | 'hermit'> = {
  regular: {
    name: 'regular',
    points: 1,
  },
  snob: {
    name: 'snob',
    points: 1,
    bonus: {
      type: 'animosity',
      points: 5,
      unless: ['regular'],
    },
  },
  hermit: {
    name: 'hermit',
    points: 1,
    bonus: {
      type: 'solitaire',
      points: 5,
    },
  },
  pair: {
    name: 'pair',
    points: 1,
    bonus: {
      type: 'group',
      groupSize: 2,
      points: 5,
    },
  },
}

render(<App catalog={catalog} />, document.getElementById('app-root'))
