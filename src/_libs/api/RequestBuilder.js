import each from 'lodash/each'
import merge from 'lodash/merge'
import assign from 'lodash/assign'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import trim from 'lodash/trim'
import reduce from 'lodash/reduce'
import get from 'lodash/get'
import set from 'lodash/set'

/**
 *
 */
export default class RequestBuilder {
  /**
   * @type {String|Array}
   * @protected
   */
  _url

  /**
   * @type {string}  get|post|put|patch|delete
   * @protected
   */
  _method

  /**
   * @type {*}
   * @protected
   */
  _data

  /**
   * @param {string} url
   * @param {string} method
   * @param {Object} data
   * @param {object} config
   * @protected
   */
  _request = (url, method, data, config) => {}


  /**
   * @type {number}
   * @protected
   */
  _version = 1

  /**
   * @type {object}
   * @protected
   */
  _config = {}

  /**
   * Используется для установки предопределенных колбеков.
   * Именованные функции используются для того, чтобы можно было занулить предыдущие объявления колбеков.
   * Важно! Сортируются по алфавиту.
   * @type {{before: {}, finally: {}, then: {}, catch: {}}}
   * @example
   * {
   *   before: {
   *     prev: (response) => {},
   *     second: (response) => {},
   *     after: (response) => {},
   *   },
   * }
   * @protected
   */
  _callbacks = {
    before: {},
    then: {},
    catch: {},
    finally: {},
  }

  /**
   * @type {*}
   * @protected
   */
  _mock = undefined

  /**
   * Задержка возвращения mock-данных в миллисекундах.
   * @type {number}
   * @protected
   */
  _mockTimeout = 500

  /**
   * Все query параметры.
   * @type {object}
   * @protected
   */
  _params = {
    page: undefined, // number
    size: undefined, // number
    fields: undefined, // { id: { ...params }, }
    search: undefined, // string
    filter: undefined, // { id: 'in:1,2,3', }
    sort: undefined, // { id: 'asc', }
    with: undefined, // { comments: { ...params } }
    key: undefined, // string
    view: undefined, // table|tree|all|time
    slice: undefined, // projectId,status
    scale: undefined, // createdAt,year
    range: undefined, // date1,date2
    query: undefined, // { id: '', }
  }

  /**
   * @type {string}
   * @protected
   */
  _hash = ''

  /**
   * @param {string|array} url
   * @param {string} method
   * @param {function} request
   * @param {object} config
   */
  constructor(url = '', method = 'get', request = null, config = {}) {
    this._url = url
    this._method = method
    this._request = request

    this.config(config)
  }

  /**
   * @param {function} callback
   * @return {Promise}
   */
  then(callback) {
    each(this._callbacks.before, (callback) => callback())

    let promise
    if (this._mock) {
      promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve(this._mock())
        }, this._mockTimeout)
      })
    } else {
      promise = this._request(this.url(), this._method, this._data, this._config)
    }

    each(this._callbacks.then, (cb) => {
      promise = promise.then(cb)
    })

    promise = promise.then(callback)

    each(this._callbacks.catch, (cb) => {
      promise = promise.catch(cb)
    })
    each(this._callbacks.finally, (cb) => {
      promise = promise.finally(cb)
    })

    return promise
  }

  /**
   * @param {object} config
   * @return {RequestBuilder}
   */
  config(config) {
    merge(this._config, config)
    return this
  }

  /**
   * @param {Function} callback
   * @param {string} name
   * @param {string} type  then|catch|finally|before
   * @return {RequestBuilder}
   */
  callback(callback, name = 'default', type = 'then') {
    if (type === 'before') {
      this._callbacks.before[name] = callback
    } else if (type === 'then') {
      this._callbacks.then[name] = callback
    } else if (type === 'catch') {
      this._callbacks.catch[name] = callback
    } else if (type === 'finally') {
      this._callbacks.finally[name] = callback
    }
    return this
  }

  /**
   * @param {*} mock
   * @param {number} timeout
   * @return {RequestBuilder}
   */
  mock(mock, timeout = 0) {
    this._mock = mock
    if (timeout) {
      this._mockTimeout = timeout
    }
    return this
  }

  /**
   * @param {number} version
   * @return {RequestBuilder}
   */
  v(version) {
    this._version = version
    return this
  }

  /**
   * @param {Object} data
   * @return {RequestBuilder}
   */
  data(data) {
    this._data = data
    return this
  }

  /**
   * @param {string} value
   * @return {RequestBuilder}
   */
  hash(value) {
    this._hash = value
    return this
  }

  /**
   * Getter/setter
   *
   * @param {object} params
   * @return {object|RequestBuilder}
   */
  params(params= undefined) {
    if (params === undefined) {
      return this._params
    }

    this._params = assign(this._params, params)
    return this
  }

  /**
   * @param {string} type
   * @param {object|string} name
   * @param {string|null} value
   * @return {RequestBuilder}
   * @protected
   */
  _setParamFunc(type, name, value= null) {
    if (this._params[type] === undefined) {
      this._params[type] = {}
    }

    if (name === null || name === undefined) {
      return this
    }

    if (typeof name === 'object') {
      this._params[type] = name
    } else {
      this._params[type][name] = value
    }

    return this
  }

  /**
   * Номер страницы, начинается с 1.
   * @example
   * .page(2)
   *
   * @param {number} page
   * @return {RequestBuilder}
   */
  page(page) {
    this._params.page = page
    return this
  }

  /**
   * Размер страницы.
   * @example
   * .size(20)
   *
   * @param {number} size
   * @return {RequestBuilder}
   */
  size(size) {
    this._params.size = size
    return this
  }

  /**
   * Полнотекстовый поиск.
   * @example
   * .search('lorem AND ipsum')
   *
   * @param {string} search
   * @return {RequestBuilder}
   */
  search(search) {
    this._params.search = search
    return this
  }

  /**
   * Сортировка
   * @example
   * .sort('id', 'asc')
   * .sort('id', 'asc').sort('title', 'desc')
   * .sort({ id: 'asc', title: 'desc', })
   *
   * @param {object|string} sort
   * @param {string} dir
   * @return {RequestBuilder}
   */
  sort(sort, dir = 'asc') {
    return this._setParamFunc('sort', sort, dir)
  }

  /**
   * Позволяет фильтровать выдачу.
   * @example
   * .filter('id', 'between:1,100')
   * .filter('id:2', 'not:10,11')
   * .filter({ status: 'in:active,waited', id: 'in:1,2,3', })
   *
   * @param {object|string} filter
   * @param {string} value
   * @return {RequestBuilder}
   */
  filter(filter, value = undefined) {
    return this._setParamFunc('filter', filter, value)
  }

  /**
   * @callback WithCallback
   * @param {RequestBuilder} q
   * @return {RequestBuilder}
   */
  /**
   * @example
   * api.get('users')
   *   .sort('id,desc')
   *   .filter({ role: 'moderator, })
   *   .with('posts', (q) => q
   *     .sort('id,desc')
   *     .filter({ status: 'archive', })
   *     .with('comments', (q) => q
   *       .sort('id,desc')))
   *   .then()
   * @example
   * .with({ posts: { with: { comments: null, }, }, })
   *
   * @param {string|object} relation
   * @param {WithCallback} q
   * @return {RequestBuilder}
   */
  with(relation, q = null) {
    let value
    if (isString(relation)) {
      value = null
      if (isFunction(q)) {
        value = q(new this.constructor())?.params() || null
      }
    }

    return this._setParamFunc('with', relation, value)
  }

  /**
   * @example
   * .fields('stats')
   * .fields('commentsCount', (q) => q.filter('status', 'active'))
   * .fields('commentsCount:inactive', (q) => q.filter('status', 'inactive'))
   * .fields([ 'id', 'title', ])
   * .fields({ id: null, title: null, commentsCount: { filter: { status: 'active', }, }, })
   *
   * @param {string|array|object} fields
   * @param {WithCallback} q
   * @return {RequestBuilder}
   */
  fields(fields, q = null) {
    let value
    if (isString(fields)) {
      value = null
      if (isFunction(q)) {
        value = q(new this.constructor())?.params() || null
      }
    } else if (isArray(fields)) {
      fields = reduce(fields, (result, item) => {
        result[item] = null
        return result
      }, {})
    }

    return this._setParamFunc('fields', fields, value)
  }

  /**
   * @param {string} key
   * @return {RequestBuilder}
   */
  key(key) {
    this._params.key = key
    return this
  }

  /**
   * @param {string} view
   * @return {RequestBuilder}
   */
  view(view) {
    this._params.view = view
    return this
  }

  /**
   * @param {string|array} fields
   * @return {RequestBuilder}
   */
  slice(...fields) {
    this._params.slice = (isArray(fields) ? fields[0] : fields).join(',')
    return this
  }

  /**
   * @param {string} field
   * @param {string} scale
   * @return {RequestBuilder}
   */
  scale(field, scale) {
    this._params.scale = field + ',' + scale
    return this
  }

  /**
   * @param {string} startDate
   * @param {string} endDate
   * @return {RequestBuilder}
   */
  range(startDate, endDate) {
    this._params.range = startDate + ',' + endDate
    return this
  }

  /**
   * Позволяет передать любые другие параметры.
   * @example
   * .query('lorem', 'ipsum')
   * .query({ lorem: 'ipsum', })
   *
   * @param {Object|string} query
   * @param {string|null} value
   * @return {RequestBuilder}
   */
  query(query, value= null) {
    return this._setParamFunc('query', query, value)
  }

  /**
   * @param {string} type
   * @param {*} name
   */
  remove(type, name = undefined) {
    const isObject = [ 'sort', 'filter', 'with', 'fields', 'query', ].includes(type)
    if (name === undefined) {
      this._params[type] = isObject ? {} : undefined
    } else if (isObject) {
      this._params[type] = reduce(this._params[type], (result, v, k) => {
        if (k !== name) {
          result[k] = v
        }
        return result
      }, {})
    }
  }

  /**
   * Получить результрирующий url.
   * @return {string}
   */
  url() {
    let url

    if (isString(this._url)) {
      url = '/' + trim(this._url, '/')
    } else { // [ 'users*/articles*', 1, 2] -> 'users/1/articles/2'
      const parts = this._url[0].split('*')
      const params = this._url.slice(1)
      each(params, (item, index) => {
        if (item !== undefined) {
          parts[index] += `/${item}`
        }
      })
      url = '/' + trim(parts.join(''), '/')
    }

    let query = {
      ...this._params.query,
      ...this._params,
    }
    delete(query.query)
    query = this.constructor.serialize(query)

    const version = this._version ? `/v${this._version}` : ''
    const hash = this._hash ? `#${this._hash}` : ''

    return version + url + query + hash
  }

  /**
   * @param {Object} params
   * @param {Boolean} withQM
   * @return {string}
   */
  static serialize(params, withQM = true) {
    const fn = (result, value, name, parent) => {
      const newParent = parent ? parent + '[' + name + ']' : name

      if (isArray(value)) {
        each(value, (v) => {
          result.push(newParent + '[]=' + v)
        })
      } else if (typeof value === 'object' && value !== null) {
        // const startLength = result.length
        each(value, (v, n) => {
          result = fn(result, v, n, newParent)
        })
        // if (startLength === result.length) {
        //   result.push(newParent)
        // }
      } else {
        if (value !== undefined) {
          result.push(newParent + ([ null, true, ].includes(value) ? '' : '=' + value))
        }
      }

      return result
    }

    let result = fn([], params, '', '').join('&')
    if (result && withQM) result = '?' + result

    return result
  }

  /**
   * @param {Object} string
   * @return {object}
   */
  static deserialize(string) {
    const result = {}

    each(string.split('&'), (item) => {
      const parts = item.split('=')
      const name = parts[0]
      const value = parts[1] || null
      const path = Array.from(name.matchAll(/([a-zA-Z:0-9]+)]?|([a-zA-Z:0-9]+)/gm)).map((val, index, array) => {
        const res = val[1] || val[2]
        if (!res) {
          const arrayKey = reduce(array, (res2, val2, index2) => {
            if (index2 < index) res2.push(val2[1] || val2[2])
            return res2
          }, [])
          return get(result, arrayKey)?.length || 0
        }
        return res
      })
      set(result, path, value)
    })

    const fun = (object) => {
      return reduce(object, (result, item, key) => {
        if (key === 'with' || key === 'fields') {
          result[key] = fun(item)
        } else {
          result[key] = item
        }
        return result
      }, {})
    }

    return fun(result)
  }
}
