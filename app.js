const { setFreshJWT } = require('./api/index')
const { getTimeStamp } = require('./utils/index')

App({
   onLaunch () {
      var { exp } = qq.getStorageSync('jwt') || {}
      
      if (!exp) {
         qq.redirectTo({ url: '/pages/auth/auth' })
      }
      else if (exp < getTimeStamp()) {
         setFreshJWT()
         .then(() => qq.redirectTo({ url: '/pages/circle/index/index' }))
      } 
      else {
         qq.redirectTo({ url: '/pages/circle/index/index' })
      }
   }
})
