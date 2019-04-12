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
         qq.showModal({
            title: '请输入完整的信息 ～',
            showCancel: false,
            confirmColor: '#24292E'
         })
      }
   },
   isComplete(data) {
      return Object.values(data).every(item => item)
   },
   sendData(data) {
      qq.showLoading()
      
      sendBindData(data)
      .then(({ data }) => {
         qq.hideLoading()
         
         if (data) {
            var { exp, sub } = JSON.parse(atob(data.split('.')[1]))
            
            qq.setStorageSync('jwt', { exp, sub, token: data })
            qq.redirectTo({ url: '/pages/avatar/avatar' })
         } else {
            qq.showModal({
               title: '输入的信息有误 ～',
               showCancel: false,
               confirmColor: '#24292E'
            })
         }
      })
   }
})