// -------------------- Definitions -----------------------------

export type Item<N extends string> = {
  points: number
  bonus?: Bonus<N>
}

export type Catalog<N extends string = string> = {
  [key in N]: Item<N>
}

export type Meta<C extends Catalog> = {
  title: string
  description: string
  items: {
    [key in Name<C>]: {
      emoji: string
      title: string
      description: string
    }
  }
}

export type Name<C extends Catalog> = C extends Catalog<infer N> ? N : string

export type Inventory<C extends Catalog> = Name<C>[]

// -------------------- Bonus types -----------------------------

// Abstract base type for bonuses
type BonusBase<T extends string> = {
  type: T
  points: number
}

// If part of a group of <groupSize> items of same type
export type GroupBonus = BonusBase<'group'> & {
  groupSize: number
}

// If only one of type
export type SolitaireBonus = BonusBase<'solitaire'>

// Item gets <bonu>*(N-1) where <N> is pos in siblings of max size <steps>
export type LadderBonus = BonusBase<'ladder'> & {
  steps: number // after this number of steps, the ladder will repeat
}

export type AnimosityBonus<N extends string> = BonusBase<'animosity'> & {
  unless: N[]
}

// Union of all bonus types
export type Bonus<N extends string> =
  | GroupBonus
  | SolitaireBonus
  | LadderBonus
  | AnimosityBonus<N>
