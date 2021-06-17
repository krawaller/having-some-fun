import { useAtom } from 'klyva'
import React, { useMemo } from 'react'
import { Catalog, Meta } from '../data/types'
import { makeInventory } from '../state/inventory'
import { Pantry } from './pantry'
import { List } from './list'
import { Summary } from './summary'

type AppProps<C extends Catalog> = {
  catalog: C
  meta: Meta<C>
}

export const App = <C extends Catalog>(props: AppProps<C>) => {
  const { catalog } = props
  const { actions, inventory } = useAppState(catalog)
  return (
    <>
      <Pantry actions={actions} catalog={catalog} />
      <List actions={actions} state={inventory} />
      <Summary actions={actions} state={inventory} catalog={catalog} />
    </>
  )
}

const useAppState = (catalog: Catalog) => {
  const { actions, inventoryAtom } = useMemo(
    () => makeInventory(catalog),
    [catalog]
  )
  const [inventory] = useAtom(inventoryAtom)
  return { actions, inventory }
}
