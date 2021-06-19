import { suite, Test } from 'uvu'
import { setupDOM } from './setup-dom'

/**
 * Wrapper around the uvu suite that...
 *  - ensures there is a fake DOM set up,
 *  - clears that DOM after each test
 */
export const domTestSuite = <Ctx = Record<string, unknown>>(
  title?: string,
  ctx?: Ctx
): Test<Ctx> => {
  const domSuite = suite(title, ctx)
  domSuite.before(() => {
    // ensure fake DOM is created
    if (!global.document) {
      setupDOM()
    }
  })
  domSuite.after.each(() => {
    // cleanup after each test
    while (document.body.lastChild) {
      document.body.removeChild(document.body.lastChild)
    }
  })
  return domSuite
}
