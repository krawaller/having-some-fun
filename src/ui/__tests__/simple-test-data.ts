import { Catalog, Meta } from '../../data'

export const catalog: Catalog<'alien' | 'clown'> = {
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
}

export const meta: Meta<typeof catalog> = {
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
  },
}
