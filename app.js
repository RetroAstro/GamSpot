const { setFreshJWT } = require('./api/index')

App({
   onLaunch () {
      var time_stamp = new Date().getTime()
      var { exp } = qq.getStorageSync('jwt') || {}
      
      if (!exp) {
         qq.redirectTo({ url: '/pages/auth/auth' })
      } else if (time_stamp > exp) {
         setFreshJWT()
      }
   }
})
