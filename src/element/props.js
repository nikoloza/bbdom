'use strict'

import { exec, isArray, isObject, isString } from '@domql/utils'
import { deepClone, deepMerge } from '../utils'

const objectizeStringProperty = propValue => {
  if (isString(propValue)) return { inheritedString: propValue }
  return propValue
}

const createPropsStack = (element, parent) => {
  const { props, __ref } = element
  const propsStack = __ref.propsStack = []

  const matchParent = parent.props && parent.props[element.key]
  const matchParentChildProps = parent.props && parent.props.childProps

  if (matchParent && props !== 'match') propsStack.push(objectizeStringProperty(matchParent))
  if (matchParentChildProps) propsStack.push(matchParentChildProps)

  if (isObject(props)) propsStack.push(props)
  else if (props === 'inherit' && parent.props) propsStack.push(parent.props)
  else if (props) propsStack.push(props)

  if (isArray(__ref.__extend)) {
    __ref.__extend.map(extend => {
      if (extend.props) propsStack.push(extend.props)
      return extend.props
    })
  }

  return propsStack
}

const inheritProps = (element, parent) => {
  element.props = (parent && parent.props) || { update, __element: element }
}

export const syncProps = (props, element) => {
  element.props = {}
  const mergedProps = { update, __element: element }
  props.forEach(v => {
    if (v === 'update' || v === '__element') return
    const execProps = exec(v, element)
    if (isObject(execProps) && execProps.__element) return
    element.props = deepMerge(mergedProps, deepClone(execProps))
  })
  element.props = mergedProps
  return element.props
}

const createProps = function (element, parent, cached) {
  const propsStack = cached || createPropsStack(element, parent)
  const { __ref } = element

  if (propsStack.length) {
    __ref.__props = propsStack
    syncProps(propsStack, element)
    element.props.update = update
  } else inheritProps(element, parent)

  return element
}

export const updateProps = (newProps, element, parent) => {
  const { __ref } = element
  let propsStack = __ref.__props

  if (newProps) propsStack = __ref.__props = [].concat(newProps, propsStack)

  if (propsStack) syncProps(propsStack, element)
  else inheritProps(element, parent)

  // console.log(cachedProps)
  return element
}

function update (props, options) {
  const element = this.__element
  // element.update({ props })
  element.update({ props }, options)
}

export default createProps
