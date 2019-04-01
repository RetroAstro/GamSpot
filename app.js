const { isStaleJWT } = require('./api')

App({
   async onLaunch () {
      if (
         await isStaleJWT()
      ) {
         qq.redirectTo({
            url: 'pages/auth/auth'
         })
      }
   }
})
