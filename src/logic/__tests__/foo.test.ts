import { test } from 'uvu'
import * as assert from 'uvu/assert'

import { foo } from '../foo'

test('the foo func', () => {
  assert.is(foo(2, 3), 5, 'we can add correctly')
})

test.run()
