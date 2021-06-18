import { useAtom } from 'klyva'
import React, { useMemo } from 'react'
import { Catalog, Meta } from '../data/types'
import { makeInventory } from '../state/inventory'
import { Pantry } from './pantry'
import { List } from './list'
import { Summary } from './summary'
import { Layout } from './layout'

type GamePointsProps<C extends Catalog> = {
  catalog: C
  meta: Meta<C>
}

export const GamePoints = <C extends Catalog>(props: GamePointsProps<C>) => {
  const { catalog, meta } = props
  const { actions, inventory } = useAppState(catalog)
  const main = (
    <>
      <Pantry actions={actions} catalog={catalog} meta={meta} />
      <List actions={actions} state={inventory} meta={meta} />
    </>
  )
  const side = (
    <Summary
      actions={actions}
      state={inventory}
      catalog={catalog}
      meta={meta}
    />
  )
  return <Layout main={main} side={side} />
}

const useAppState = (catalog: Catalog) => {
  const { actions, inventoryAtom } = useMemo(
    () => makeInventory(catalog),
    [catalog]
  )
  const [inventory] = useAtom(inventoryAtom)
  return { actions, inventory }
}
