'use strict'

import Err from '../../res/error'
import method from '../method'
import exec from './'

/**
 * Appends raw HTML as content
 * an original one as a child
 */
export default (param, element, node) => {
  if (param) {
    node.innerHTML = param
  }
}
