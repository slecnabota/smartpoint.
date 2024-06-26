import each from 'lodash/each'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import reject from 'lodash/reject'
import merge from 'lodash/merge'
import get from 'lodash/get'
import set from 'lodash/set'
import unset from 'lodash/unset'
import trim from 'lodash/trim'
import pull from 'lodash/pull'
import includes from 'lodash/includes'
import concat from 'lodash/concat'
import assign from 'lodash/assign'
import size from 'lodash/size'
import invert from 'lodash/invert'
import values from 'lodash/values'
import reverse from 'lodash/reverse'
import clone from 'lodash/clone'
import cloneDeep from 'lodash/cloneDeep'
import defer from 'lodash/defer'
import delay from 'lodash/delay'
import random from 'lodash/random'
import sortBy from 'lodash/sortBy'
import filter from 'lodash/filter'
import shuffle from 'lodash/shuffle'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import isBoolean from 'lodash/isBoolean'
import custom from './customFn'


const formatPhone = (phone) => {
  if (!isString(phone)) {
    return ''
  }

  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith("8")) {
    digits = "7" + digits.substring(1);
  } else if (!digits.startsWith("7")) {
    digits = "7" + digits;
  }

  return digits.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, "+$1 ($2) $3-$4-$5")
}

const setInRange = (value, a, b) => {
  const min = a < b ? a : b
  const max = a > b ? a : b

  if (value < min) return min
  if (value > max) return max

  return value
}

/**
 * @param {Array|Object} container
 * @param {Function} callback
 * @param {string} childrenName
 * @param {Function} parentData
 */
const eachDeep = (container, callback, childrenName = 'children', parentData = undefined) => {
  each(container, (item, key) => {
    let _parentData = parentData
    const data = (d) => {
      if (d === undefined) return _parentData
      _parentData = d
    }
    callback(item, key, data)
    const children = item[childrenName]
    if (isArray(children) || isObject(children)) {
      eachDeep(children, callback, childrenName, _parentData)
    }
  })
}

const mapDeep = (container, childrenName, callback, deep = 0) => {
  return map(container, (cont) => {
    cont = clone(cont)
    let children = cont[childrenName]
    if (isArray(children) || isObject(children)) {
      children = mapDeep(children, childrenName, callback, deep)
    }
    if (children !== undefined) {
      cont[childrenName] = children
    }
    return callback(cont)
  })
}

/**
 * @param {Array|Object} container
 * @param {Function} callback
 * @param {*} accumulator
 * @param {string} childrenName
 * @param {Function} parentData
 * @return {*}
 */
const reduceDeep = (container, callback, accumulator, childrenName = 'children', parentData = undefined) => {
  return reduce(container, (result, item, key) => {
    let _parentData = parentData
    const data = (d) => {
      if (d === undefined) return _parentData
      _parentData = d
    }
    result = callback(result, item, key, data)
    const children = item[childrenName]
    if (isArray(children) || isObject(children)) {
      result = reduceDeep(children, callback, result, childrenName, _parentData)
    }
    return result
  }, accumulator)
}

const promiseObjects = (array, key = 'promise') => {
  const promises = []

  array.forEach((object) => promises.push(object[key]))

  return Promise.all(promises).then((responses) => {
    return responses.reduce((result, response, i) => {
      result.push({
        ...array[i],
        response,
      })
      return result
    }, [])
  })
}

const isPromise = (obj) => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

export default () => ({
  each,
  map,
  reduce,
  find,
  findIndex,
  filter,
  reject,
  merge,
  get,
  set,
  unset,
  trim,
  pull,
  includes,
  concat,
  assign,
  size,
  invert,
  values,
  reverse,
  clone,
  cloneDeep,
  defer,
  delay,
  random,
  sortBy,
  shuffle,
  debounce,
  throttle,
  isEqual,
  isObject,
  isArray,
  isFunction,
  isString,
  isBoolean,

  formatPhone,
  setInRange,
  mapDeep,
  reduceDeep,
  eachDeep,
  isPromise,
  promiseObjects,

  ...custom,
})
