const isFunc = value => typeof value === 'function'

const combine = (prev, next) => {
  let result = { ...prev }

  Object.keys(next)
    .map(key => {
      if (prev[key]) {
        if (isFunc(prev[key])) {
          result[key] = function () {
            let args = [...arguments]

            prev[key].call(this)
            next[key].apply(this, args)
          }
        } else {
          result[key] = { ...prev[key], ...next[key] }
        }
      } else {
        if (isFunc(next[key])) {
          result[key] = function () {
            let args = [...arguments]

            return next[key].apply(this, args)
          }
        } else {
          result[key] = { ...next[key] }
        }
      }
    })

  return result
}

module.exports = (...args) => args.reduce((prev, next) => combine(prev, next))
