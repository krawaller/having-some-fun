// -------------------- Definitions -----------------------------

export type Item<N extends string> = {
  name: N
  points: number
  bonus?: Bonus<N>
}

export type Catalog<N extends string = string> = {
  [key in N]: Item<key>
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

// Multiplied by <multiplier>^(N-1) where <N> is pos in group of max size <height>
export type StairBonus = BonusBase<'stair'> & {
  multiplier: number
  height: number
}

export type AnimosityBonus<N extends string> = BonusBase<'animosity'> & {
  unless: N[]
}

// Union of all bonus types
export type Bonus<N extends string> =
  | GroupBonus
  | SolitaireBonus
  | StairBonus
  | AnimosityBonus<N>
