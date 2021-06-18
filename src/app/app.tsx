import { useAtom } from 'klyva'
import styled from 'styled-components'
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

const Container = styled.div`
  display: flex;
`

const Left = styled.div`
  flex-grow: 1;
`

const Right = styled.div`
  width: 400px;
  flex-shrink: 0;
`

export const App = <C extends Catalog>(props: AppProps<C>) => {
  const { catalog, meta } = props
  const { actions, inventory } = useAppState(catalog)
  return (
    <Container>
      <Left>
        <Pantry actions={actions} catalog={catalog} meta={meta} />
        <List actions={actions} state={inventory} meta={meta} />
      </Left>
      <Right>
        <Summary
          actions={actions}
          state={inventory}
          catalog={catalog}
          meta={meta}
        />
      </Right>
    </Container>
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
