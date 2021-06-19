/*
The entrypoint of our application!
*/

import React from 'react'
import { render } from 'react-dom'
import { GamePoints } from '../ui'
import { catalog, meta } from './data'

render(
  <GamePoints catalog={catalog} meta={meta} />,
  document.getElementById('app-root')
)
