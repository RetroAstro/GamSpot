const { sendBindData } = require('../../api/index')

Page({
   onLoad() {
      sendBindData({
         nickname: 'RetroAstro',
         stuid: '2017212786',
         identification: '080410'
      })
      .then(({ data }) => {
         if (data) {
            var { exp, sub } = JSON.parse(atob(data.split('.')[1]))
            qq.setStorageSync('jwt', { exp, sub, token: data })
            qq.redirectTo({ url: '/pages/circle/index/index' })
         } else {
            console.log('绑定信息有误！')
         }
      })
   }
})