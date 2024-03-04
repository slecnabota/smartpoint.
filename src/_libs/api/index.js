import axios from 'axios'
import get from 'lodash/get'
import each from 'lodash/each'
import merge from 'lodash/merge'
import NastLib from '../core/Lib.js'

/**
 *
 */
export default class NastApi extends NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static defaultConfig = {
    servers: {
      default: 'http://127.0.0.1:8000/api/',
    },
    then: (r) => r,
    catch: (r) => {
      throw r
    },
    finally: () => {},
  }

  /**
   * @type {Object}
   * @protected
   */
  _instances = {}

  /**
   * Configurations for instances
   * @type {Object}
   * @protected
   */
  _configs = {}

  /**
   * @type {RequestBuilder}
   * @protected
   */
  _requestBuilder = null


  /**
   * @param {RequestBuilder} requestBuilder
   * @param {Object} config
   */
  constructor(requestBuilder, config = {}) {
    super(config)
    const servers = get(config, 'servers', this.constructor.defaultConfig.servers)
    each(servers, (baseURL, name) => {
      this._instances[name] = axios.create({ baseURL, })
      this._configs[name] = []
      this._requestBuilder = requestBuilder
    })
  }

  /**
   * @param {String|Array} url
   * @param {string} name  Name of api instance
   * @return {RequestBuilder}
   */
  get(url, name = 'default') {
    return this._request(url, 'get', name)
  }

  /**
   * @param {String|Array} url
   * @param {string} name  Name of api instance
   * @return {RequestBuilder}
   */
  post(url, name = 'default') {
    return this._request(url, 'post', name)
  }

  /**
   * @param {String|Array} url
   * @param {string} name  Name of api instance
   * @return {RequestBuilder}
   */
  put(url, name = 'default') {
    return this._request(url, 'put', name)
  }

  /**
   * @param {String|Array} url
   * @param {string} name  Name of api instance
   * @return {RequestBuilder}
   */
  patch(url, name = 'default') {
    return this._request(url, 'patch', name)
  }

  /**
   * @param {String|Array} url
   * @param {string} name  Name of api instance
   * @return {RequestBuilder}
   */
  delete(url, name = 'default') {
    return this._request(url, 'delete', name)
  }

  /**
   * Config instance
   * @param {ApiConfigInterface} config
   * @param {string} name  Name of api instance
   */
  config(config, name = 'default') {
    const headers = {
      ...(this._configs[name].headers || {}),
      ...(config.headers || {})
    }
    this._configs[name] = {
      ...this._configs[name],
      ...config,
      headers,
    }
  }


  /**
   * @param {String|Array} url
   * @param {string} method
   * @param {string} name
   * @return {RequestBuilder}
   * @protected
   */
  _request(url, method, name = 'default') {
    const request = (url, method, data, config) => {
      return this._instances[name]({ ...config, url, method, data, })
    }
    return new (this._requestBuilder)(url, method, request, this._configs[name])
    .callback(this._config('then'), 'config')
    .callback(this._config('catch'), 'config', 'catch')
  }
}