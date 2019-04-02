const { setFreshJWT } = require('../../api/index')

Page({
   getUserInfo(e) {
      if (e.detail.userInfo) {
         setFreshJWT()
         .then(() => qq.redirectTo({ url: '/pages/bind/bind' }))
      } else {
         console.log('获取用户信息失败！')
      }
   }
})

