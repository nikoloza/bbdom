'use strict'

import DOM from '../../src'
import { isObjectLike, exec, isObject, isEqualDeep } from '../../src/utils'
import { classList } from '../../src/element/mixins'
import createEmotion from '@emotion/css/create-instance'
const ENV = process.env.NODE_ENV
import { measure } from '@domql/performance'

export const initEmotion = (container, options) => {
  const {
    flush,
    hydrate,
    cx,
    merge,
    getRegisteredStyles,
    injectGlobal,
    keyframes,
    css,
    sheet,
    cache
  } = createEmotion({ key: 'smbls', container })

  const style = (params, element, node) => {
    const execPareams = exec(params, element)
    if (params) {
      if (isObjectLike(element.class)) element.class.elementStyle = execPareams
      else element.class = { elementStyle: execPareams }
    }
    classf(element.class, element, node)
  }

  const classf = (params, element, node) => {
    const { __class } = element
    if (isObjectLike(params)) {
      const classObjHelper = {}
      for (const key in params) {
        const prop = exec(params[key], element)
        if (!prop && prop === __class[key]) continue
        __class[key] = prop
        if ((ENV === 'test' || ENV === 'development') && isObject(prop)) prop.label = key || element.key
        const CSSed = css(prop)
        classObjHelper[key] = CSSed
      }
      classList(classObjHelper, element, node)
    }
  }

  DOM.define({
    style,
    class: classf
  }, {
    overwrite: true
  })
}

initEmotion()