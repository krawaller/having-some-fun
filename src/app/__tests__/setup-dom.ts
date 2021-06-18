import { parseHTML } from 'linkedom'

/**
 * Uses linkedom to set up browser globals
 */
export const setupDOM = () => {
  const { window } = parseHTML(`<body><main></main></body>`)
  global.window = window
  global.document = window.document
  global.navigator = window.navigator
}
