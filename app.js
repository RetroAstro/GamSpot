const { setFreshJWT } = require('./api/index')

App({
   onLaunch () {
      var { exp } = qq.getStorageSync('jwt') || {}
      var time_stamp = new Date().getTime()
      
      if (!exp) {
         qq.redirectTo({ url: '/pages/auth/auth' })
      } else if (time_stamp > exp) {
         setFreshJWT()
      }
   }
})
