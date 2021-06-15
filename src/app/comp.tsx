import React from 'react'
import { foo } from '../logic/foo'

export const Comp = (props: { a: number; b: number }) => {
  const { a, b } = props
  return (
    <div>
      Sum of {a} and {b} is <span data-testid="sum">{foo(a, b)}</span>!
    </div>
  )
}
