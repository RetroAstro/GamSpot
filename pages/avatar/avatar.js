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
      if (this.data.gender) {
         qq.switchTab({ url: '/pages/popular/popular' })
      } else {
         qq.showModal({
            title: '您还未选择性别呢 ～',
            showCancel: false,
            confirmColor: '#24292E'
         })
      }
   }
})