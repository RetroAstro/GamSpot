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
         .then(({ status }) => {
            if (status === 10000) {
               this.saveGender(gender)
               qq.switchTab({ url: '/pages/popular/popular' })
            }
         })
      } else {
         qq.showModal({
            title: '您还未选择性别呢 ～',
            showCancel: false,
            confirmColor: '#24292E'
         })
      }
   },
   saveGender(gender) {
      let userInfo = qq.getStorageSync('userInfo')

      qq.setStorageSync('userInfo', {
         ...userInfo,
         gender: gender == 1 ? 'male' : 'female'
      })
   }
})