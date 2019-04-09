const { sendBindData } = require('../../api/index')

Page({
   data: {
      mark: ''
   },
   onFocus(e) {
      this.setData({
         mark: e.currentTarget.dataset.mark
      })
   },
   formSubmit(e) {
      var data = e.detail.value

      if (this.isComplete(data)) {
         this.sendData(data)
      } else {
         qq.showToast({
            title: '请输入完整信息！',
            icon: 'none',
            duration: 2000
         })
      }
   },
   isComplete(data) {
      return Object.values(data).every(item => item)
   },
   sendData(data) {
      sendBindData(data)
      .then(({ data }) => {
         if (data) {
            var { exp, sub } = JSON.parse(atob(data.split('.')[1]))
            
            qq.setStorageSync('jwt', { exp, sub, token: data })
            qq.switchTab({ url: '/pages/popular/popular' })
         } else {
            qq.showToast({
               title: '输入信息有误！',
               icon: 'none',
               duration: 2000
            })
         }
      })
   }
})