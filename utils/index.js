const moment = require('../lib/moment/index')

const timeFromNow = timestamp => moment.unix(timestamp).startOf('minute').fromNow()

const unique = array => [...new Set(array)]

const promisify = fn => {
   return function() {
      let args = [...arguments]
      return new Promise((resolve, reject) => fn.apply(null, [...args, resolve, reject]))
   }
}

const throttle = (func, wait) => {
   let context, args, previous = 0

   return function() {
       let now = +new Date()
       context = this
       args = arguments

       if (now - previous > wait) {
           func.apply(null, [context, ...args])
           previous = now
       }
   }
}

const debounce = (func, wait) => {
   let timeout, context, args

   return function () {
      context = this
      args = arguments

      timeout ? clearTimeout(timeout) : null

      let callNow = !timeout

      timeout = setTimeout(() => timeout = null, wait)

      callNow ? func.apply(null, [context, ...args]) : null
   }
}

const getImageRatio = promisify((url, resolve) => {
   qq.getImageInfo({
      src: url,
      success({ width, height }) {
         resolve(width / height)
      }
   })
})

module.exports = {
   timeFromNow,
   unique,
   promisify,
   throttle,
   debounce,
   getImageRatio
}