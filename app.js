const { setFreshJWT } = require('./api/index')
const { getTimeStamp } = require('./utils/index')

App({
   onLaunch () {
      var jwt = qq.getStorageSync('jwt') || {}
      
      qq.showTabBarRedDot({ index: 2 })
      // this.routeSwitch(jwt)
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
