const { setFreshJWT } = require('./api/index')

App({
   onLaunch () {
      var { exp } = qq.getStorageSync('jwt') || {}

      if (!exp) qq.redirectTo({ url: '/pages/auth/auth' })
      
      var time_stamp = new Date().getTime()
      if (exp && time_stamp > exp) setFreshJWT()
   }
})
