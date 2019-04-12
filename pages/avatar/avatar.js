const { sendGender } = require('../../api/index')

Page({
   data: {
      gender: ''
   },
   chooseGender(e) {
      this.setData({
         gender: e.currentTarget.dataset.gender
      })
   },
   onNavigate() {
      let gender = this.data.gender
      
      if (gender) {
         sendGender({ gender })
         .then(({ status }) => status === 10000 ? qq.switchTab({ url: '/pages/popular/popular' }) : null)
      } else {
         qq.showModal({
            title: '您还未选择性别呢 ～',
            showCancel: false,
            confirmColor: '#24292E'
         })
      }
   }
})