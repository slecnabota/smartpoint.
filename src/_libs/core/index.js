import get from 'lodash/get'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import isFunction from 'lodash/isFunction'
import NastLib from './Lib'
import { defineStore, } from 'pinia'
import { useRouter, } from 'vue-router'
/**
 *
 */
/* eslint-disable */
export default class NastCore extends NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {}

  /**
   * @param {Object} app
   * @param {Object} router
   * @param {Object} settings
   * @param {Object} libs
   * @return {this}
   */
  static init(app, router, settings = {}, libs = {}) {
    // Globals
    window.$config = (key, def) => this._configFn(settings.config ? settings.config() : {}, key, def)
    window.$env = (key, def) => this._envFn(key, def)
    window.$n = settings.fn ? settings.fn() : {}
    /** @var {RestApi} */
    window.$api = settings.api ? new (settings.api)() : {}


    const stores = reduce(this._getLibsStores(libs), (result, store, name) => {
      if (store) {
        result[name] = defineStore('nast.' + name, store)
      }
      return result
    }, {})


    window.$app = {
      stores,
      // /** @var {NastRouter} */
      router,
      /** @var {NastApi} */
      api: libs.api ? new (libs.api.NastApi)(libs.api.RequestBuilder, $config('api')) : {},
      /** @var {NastAuth} */
      auth: libs.auth ? new (libs.auth.NastAuth)(stores.auth(), router, $config('auth')) : {},
      /** @var {NastDate} */
      date: libs.date ? new (libs.date.NastDate)($config('date')) : {},
      /** @var {NastForm} */
      // form: libs.form ? new (libs.form.NastForm)($config('form')) : {},
      /** @var {NastSecure} */
      // secure: libs.secure ? new (libs.secure.NastSecure)($config('secure')) : {},
      /** @var {NastUi} */
      // ui: libs.ui ? new (libs.ui.NastUi)(store.store(), $config('ui')) : {},
    }
    // end Globals

    app.use({
      install(app) {
        app.config.globalProperties.$config = $config
        app.config.globalProperties.$n = $n
        app.config.globalProperties.$api = $api
        /** @var {api: NastApi} **/
        app.config.globalProperties.$app = $app
      }
    })

    map(this._getLibsPlugins(libs), (plugin, name) => {
      if (plugin) {
        console.log(name, plugin);
        app.use(plugin, $config(name))
      }
    })
  }


  /**
   * Вызывает функцию store() в каждой библиотеке и возвращает объектом
   * @param {Object} libs
   * @return {Object}
   * @protected
   */
  static _getLibsStores(libs) {
    return reduce(libs, (result, lib, name) => {
      const func = lib['Nast' + name.charAt(0).toLocaleUpperCase() + name.slice(1)].store
      if (isFunction(func)) {
        result[name] = func($config(name))
      }
      return result
    }, {})
  }

  /**
   * Достает функцию vue из каждой библиотеки
   * @param {Object} libs
   * @return {Object}
   * @protected
   */
  static _getLibsPlugins(libs) {
    return reduce(libs, (result, lib, name) => {
      const func = lib['Nast' + name.charAt(0).toLocaleUpperCase() + name.slice(1)].vue
      if (isFunction(func)) {
        result[name] = func()
      }
      return result
    }, {})
  }

  /**
   * @param {Object} data
   * @param {string} key
   * @param {*} def
   * @return {*}
   * @protected
   */
  static _configFn(data, key = undefined, def = undefined) {
    if (key === undefined) {
      return data
    }
    return get(data, key, def)
  }

  /**
   * @param {string} key
   * @param {*} def
   * @return {*}
   * @protected
   */
  static _envFn(key = undefined, def = undefined) {
    if (key === undefined) {
      return import.meta.env
    }
    return get(import.meta.env, key, def)
  }
}

export {
  NastLib,
}
