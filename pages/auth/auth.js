const { getFreshJWT } = require('../../api')

Page({
   getUserInfo(e) {
      if (e.detail.userInfo) {
         qq.login({
            success({ code }) {
               getFreshJWT(code)
               .then(({ jwt }) => {
                  qq.setStorageSync('jwt', jwt)
               })
            }
         })
      } else {
         console.log('获取用户信息失败！')
      }
   }
})

