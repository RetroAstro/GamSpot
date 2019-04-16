const { setFreshJWT, resetAllData } = require('./api/index')
const { getTimeStamp } = require('./utils/index')

App({
   onLaunch () {
      let jwt = qq.getStorageSync('jwt') || {}

      this.routeSwitch(jwt)
   },
   routeSwitch({ exp, sub }) {
      if (!exp) {
         qq.redirectTo({ url: '/pages/auth/auth' })
      }
      else if (sub === 'guest') {
         qq.redirectTo({ url: '/pages/bind/bind' })
      }
      else if (exp < getTimeStamp()) {
         setFreshJWT()
         .then(() => qq.switchTab({ url: '/pages/popular/popular' }))
      }
      else {
         qq.switchTab({ url: '/pages/popular/popular' })
      }
   }
})
