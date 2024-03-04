
/**
 *
 */
export default class QueryParamsInterface {
  /**
   * @type {number}
   */
  page = 0
  
  /**
   * @type {number}
   */
  size = 0
  
  /**
   * @type {Array}
   */
  sort = []
  
  /**
   * @type {string}
   */
  search = ''
  
  /**
   * @type {Object}
   */
  filter = {}
  
  /**
   * @type {Object}
   */
  with = {}
  
  /**
   * @type {Array}
   */
  fields = []

  /**
   * @type {string}
   */
  key = ''
  
  /**
   * @type {boolean}
   */
  tree = false
  
  /**
   * @type {boolean}
   */
  all = false
  
  /**
   * @type {Object}
   */
  query = {}
}
