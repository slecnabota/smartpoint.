import get from 'lodash/get'

/**
 *
 */
export default class NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {}

  /**
   * @type {Object}
   * @protected
   */
  _userConfig = {}

  /**
   * @param {Object} config
   */
  constructor(config = {}) {
    this._userConfig = config
  }

  /**
   * Returns store object for vuex
   * @param {Object} config
   * @return {Object}
   */
  static store(config = {}) {
    return {}
  }

  /**
   * Returns plugin object for Vue.use
   * @return {Object}
   */
  static vue() {
    return null
  }

  /**
   * Default config
   * @param {string} key
   * @param {Object} config
   * @return {*}
   * @protected
   */
  _config(key, config = undefined) {
    return get(this._userConfig || {}, key, this.constructor._defaultConfig[key])
  }
}
