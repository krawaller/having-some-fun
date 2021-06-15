import React from 'react'

export const Comp = (props: { a: number; b: number }) => {
  const { a, b } = props
  return (
    <div>
      Sum of {a} and {b} is <span data-testid="sum">{a + b}</span>!
    </div>
  )
}
