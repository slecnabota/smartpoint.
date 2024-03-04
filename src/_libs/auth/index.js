import size from 'lodash/size'
import reduce from 'lodash/reduce'
import isObject from 'lodash/isObject'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import isBoolean from 'lodash/isBoolean'
import isNumber from 'lodash/isNumber'
import { computed } from 'vue'
import NastLib from '../core/Lib'

/* eslint-disable */
/**
 *
 */
export default class NastAuth extends NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {
    loginRoute: 'login',
    authRoute: 'index',
    apiAuth: (token) => {},
    clarifyApi: (grantName) => new Promise((resolve) => resolve([])),
  }

  /**
   * @protected
   */
  _store

  /**
   * @protected
   */
  _router

  /**
   * @param store
   * @param router
   * @param {Object} config
   */
  constructor(store, router, config = {}) {
    super(config)

    this._store = store
    this._router = router
  }

  /**
   * @param {Object} user
   * @param {string} token
   * @param {object} grants
   * @param {boolean} redirect
   */
  login(user, token = undefined, grants = {}, redirect = true) {
    let r = redirect
    if (user.user) {
      r = token !== undefined ? token : true
      this._store.login(user)
    } else {
      this._store.login({ user, token, grants, })
    }

    if (r) {
      this.needAuth(false)
    }
  }

  /**
   * @return {boolean}
   */
  loggedIn() {
    return Boolean(this._store.token)
  }

  /**
   *
   */
  logout(redirect = true) {
    this._store.logout()
    if (redirect) {
      this.needAuth(true)
    }
  }

  /**
   * Получаем текущего юзера, если передан параметр - обновляем юзера
   * @param {Object} user
   * @return {Object}
   */
  user(user = undefined) {
    if (user) {
      this._store.update({ user, })
    }
    return computed(() => this._store.user)
  }

  /**
   * Получаем текущий токен, если передан параметр - обновляем токен
   * @param {Object} token
   * @return {Object}
   */
  token(token = undefined) {
    if (token) {
      this._store.update({ token, })
    }
    return computed(() => this._store.token)
  }

  /**
   * Получаем текущие полномочия юзера, если передан параметр - обновляем полномочия
   * @param {Object} grants
   * @return {Object}
   */
  grants(grants = undefined) {
    if (grants) {
      this._store.update({ grants, })
    }
    return computed(() => this._store.grants)
  }

  /**
   * @param {boolean} needAuth
   */
  needAuth(needAuth = true) {
    let route = this._config(needAuth ? 'loginRoute' : 'authRoute')
    if (isString(route)) {
      route = { name: route, }
    }

    if ((needAuth && !this.loggedIn()) || (!needAuth && this.loggedIn())) {
      this._router.replace(route)
    }
  }

  /**
   * Обновление/установка аутентификации в апи
   */
  apiLogin() {
    this._config('apiAuth')(this._store.token)
  }

  /**
   * Уточняем полномочие.
   * Используется если полномочия назначаются на узлы дерева, и нам надо рекурсивно вытащить детей и родителей
   * этого узла. Сразу считать все полномочия нет смысла, так как это очень тяжелый запрос и кешировать это бесполезно
   * из-за постоянного обновления дерева. Поэтому считаем только при необходимости.
   * @param {string} grant
   * @return {Promise}
   */
  clarify(grant) {
    return this._config('clarifyApi')(grant).then((value) => {
      this.grants({
        ...this.grants(),
        [grant]: value,
      })
      return value
    })
  }

  /**
   * @param {string|object|array} name
   * @param {any} fieldValue  Если передано null,
   * @param {string} fieldName
   * @param {boolean} any
   * @param {array} grants
   * @return {boolean}
   *
   */
  can(name, fieldValue = undefined, fieldName = 'id', any = false, grants = undefined) {
    if (isArray(name)) {
      grants = fieldValue
      for (const i in name) {
        if (!this.can(name[i], grants)) {
          return false
        }
      }
      return true
    }

    if (isObject(name)) {
      grants = fieldValue
      fieldValue = name.value
      fieldName = name.field || 'id'
      any = name.any
      name = name.name
    }

    if (!grants) {
      grants = this.grants()
      if (!grants) {
        return false
      }
    }
    if (!size(grants)) {
      return false
    }

    const grant = grants[name]
    if (grant === undefined) {
      return false
    }
    if (isBoolean(grant)) {
      return grant
    }
    if (fieldValue === undefined) {
      return true
    }
    if (isArray(grant) && isNumber(grant[0])) {
      return grant.includes(fieldValue)
    }

    // delete

    if (size(grant) === 0 || any === true) {
      return true
    }
    if (!grant[fieldName]) {
      return false
    }

    return grant[fieldName].includes(fieldValue)
  }

  /**
   * @param {array} accesses
   * @param {array} grants
   * @return {boolean}
   */
  canAny(accesses, grants = undefined) {
    for (const i in accesses) {
      if (this.can(accesses[i], grants)) {
        return true
      }
    }

    return false
  }

  /**
   * @param {array|object} collection
   * @param {array} fields
   * @param {array} grants
   * @return {array|object}
   */
  filter(collection, fields = [ 'can', 'canAny', ], grants = undefined) {
    return reduce(collection, (result, item, key) => {
      let push = false
      if (item[fields[0]]) {
        if (this.can(item[fields[0]], grants)) {
          push = true
        }
      } else if (item[fields[1]]) {
        if (this.canAny(item[fields[1]], grants)) {
          push = true
        }
      } else {
        push = true
      }

      if (push) {
        if (isArray(collection)) {
          result.push(item)
        } else {
          result[key] = item
        }
      }

      return result
    }, isArray(collection) ? [] : {})
  }

  /**
   * Returns store object for vuex
   * @param {Object} config
   * @return {Object}
   */
  static store(config = {}) {
    const init = () => {
      const lsAuth = JSON.parse(localStorage.getItem('auth'))
      const user = lsAuth?.user || {}
      const token = lsAuth?.token || ''
      const grants = lsAuth?.grants || {}

      setTimeout(() => {
        $app.auth.apiLogin(token)
      }, 1)

      return { user, token, grants, }
    }

    return {
      state() {
        return init()
      },
      actions: {
        login({ user, token, grants, }) {
          this.user = user
          this.token = token
          this.grants = grants
          localStorage.setItem('auth', JSON.stringify({ user, token, grants, }))
          $app.auth.apiLogin(token)
        },
        logout() {
          this.user = {}
          this.token = ''
          this.grants = {}
          localStorage.removeItem('auth')
          $app.auth.apiLogin('')
        },
        update({ user, token, grants }) {
          if (user) this.user = user
          if (token) this.token = token
          if (grants) this.grants = grants
          localStorage.setItem('auth', JSON.stringify({ user: this.user, token: this.token, grants: this.grants, }))
          $app.auth.apiLogin(token)
        },
      },
    }
  }
}
