const { setFreshJWT } = require('../../api/index')

Page({
   getUserInfo(e) {
      if (e.detail.userInfo) {
         setFreshJWT()
         .then(() => {
            let { sub } = qq.getStorageSync('jwt')

            if (sub === 'student') {
               qq.switchTab({ url: '/pages/popular/popular' })
            } else {
               qq.redirectTo({ url: '/pages/bind/bind' })
            }
         })
      } else {
         qq.showModal({
            title: '您点击了拒绝授权，因而无法正常使用此款小程序的功能！',
            showCancel: false,
            confirmColor: '#24292E'
         })
      }
   }
})

