import { createElement as RCE } from 'react'
import { render as reactRender } from 'react-dom'

export const render = domNode => vdom =>
  new Promise(resolve => reactRender(vdom, domNode, resolve))

export const createElement = (Component, props, ...children) =>
  typeof Component === 'string'
    ? RCE(Component, props, ...children)
    : RCE(Component, { ...(props || {}), createElement }, ...children)
