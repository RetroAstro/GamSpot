const { setFreshJWT } = require('../../api/index')

Page({
   getUserInfo(e) {
      if (e.detail.userInfo) {
         setFreshJWT()
         .then(() => {
            var { sub } = qq.getStorageSync('jwt')

            if (sub === 'student') {
               qq.switchTab({ url: '/pages/popular/popular' })
            } else {
               qq.redirectTo({ url: '/pages/bind/bind' })
            }
         })
      } else {
         qq.showModal({
            title: '注意',
            content: '您点击了拒绝授权，因而无法正常使用此款小程序的功能！若是因为手滑，请先删除小程序后再次进入。'
         })
      }
   }
})

