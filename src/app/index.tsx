import React from 'react'
import { render } from 'react-dom'
import { Comp } from './comp'

render(<Comp a={2} b={5} />, document.getElementById('app-root'))
