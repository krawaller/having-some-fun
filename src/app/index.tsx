import React from 'react'
import { render } from 'react-dom'
import { Catalog, Meta } from '../data/types'
import { App } from './app'

const catalog: Catalog<'alien' | 'clown' | 'robot' | 'ghost'> = {
  alien: {
    points: 1,
  },
  clown: {
    points: 1,
    bonus: {
      type: 'animosity',
      points: 5,
      unless: ['alien'],
    },
  },
  robot: {
    points: 1,
    bonus: {
      type: 'solitaire',
      points: 5,
    },
  },
  ghost: {
    points: 1,
    bonus: {
      type: 'group',
      groupSize: 2,
      points: 5,
    },
  },
}

const meta: Meta<typeof catalog> = {
  title: '',
  description: '',
  items: {
    alien: {
      description: '',
      emoji: '👽',
      title: 'alien',
    },
    clown: {
      description: '',
      emoji: '🤡',
      title: 'clown',
    },
    robot: {
      description: '',
      emoji: '🤖',
      title: 'robot',
    },
    ghost: {
      description: '',
      emoji: '👻',
      title: 'ghost',
    },
  },
}

render(
  <App catalog={catalog} meta={meta} />,
  document.getElementById('app-root')
)
