const getTimeStamp = () => Math.round(new Date().getTime() / 1000).toString()

const promisify = fn => {
   return function() {
      let args = [...arguments]
      return new Promise((resolve, reject) => {
         fn.apply(null, [...args, resolve, reject])
      })
   }
}

module.exports = {
   getTimeStamp,
   promisify
}