Page({
   getUserInfo(e) {
      if (e.detail.userInfo) {
         let { sub } = qq.getStorageSync('userInfo')
         
         sub === 'student' ?
            qq.switchTab({ url: '/pages/popular/popular' }) : qq.redirectTo({ url: '/pages/bind/bind' })
      } else {
         qq.setStorageSync('userInfo', {})

         qq.showModal({
            title: '您点击了拒绝授权，因而无法正常使用此款小程序的功能！',
            showCancel: false,
            confirmColor: '#24292E'
         })
      }
   }
})

