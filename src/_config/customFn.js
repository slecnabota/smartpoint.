/**
 * Функции, которые используются только в этом проекте.
 * Все функции, объявленные здесь, будут доступны во всем проекте как $n.example()
 */
/* eslint-disable */
export default {
  example() {
    console.log('This is example function')
  },
  errorsToArray(errors) {
    return $n.reduce(errors, (result, errors) => {
      result.push(errors[0])
      return result
    }, [])
  }
}
