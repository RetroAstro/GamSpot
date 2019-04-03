const { setFreshJWT } = require('./api/index')

App({
   onLaunch () {
      var { exp } = qq.getStorageSync('jwt') || {}
      var time_stamp = Math.round(new Date().getTime() / 1000).toString()
      
      if (!exp) {
         qq.redirectTo({ url: '/pages/auth/auth' })
      } 
      else if (time_stamp > exp) {
         setFreshJWT()
         .then(() => qq.redirectTo({ url: '/pages/circle/index/index' }))
      } 
      else {
         qq.redirectTo({ url: '/pages/circle/index/index' })
      }
   }
})
