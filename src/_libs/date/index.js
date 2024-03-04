import moment from 'moment'
import get from 'lodash/get'
import NastLib from '../core/Lib'

/**
 *
 */
export default class NastDate extends NastLib {
  /**
   * @type {Object}
   * @protected
   */
  static _defaultConfig = {
    formats: {
      date: 'DD.MM.YYYY',
      time: 'HH:mm',
      datetime: 'DD.MM.YYYY HH:mm',
    },
    default: 'datetime',
  }

  /**
   * @param {Object} config
   */
  constructor(config) {
    super(config)
  }

  /**
   * @param {*} datetime
   *
   * @return {moment.Moment}
   */
  now(datetime = undefined) {
    return moment(datetime)
  }

  /**
   * @param {*} datetime
   * @param {string} type
   * @return {string}
   */
  format(datetime = undefined, type = undefined) {
    if (!type) {
      type = this._config('default')
    }

    return moment(datetime).format(get(this._config('formats'), type, this._defaultFormat()))
  }

  /**
   * @return {*}
   * @protected
   */
  _defaultFormat() {
    return this._config('formats')[this._config('default')]
  }
}
