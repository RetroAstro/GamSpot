Page({
   data: {
      gender: '',
      nickname: ''
   },
   onLoad() {
      let { gender, nickname } = qq.getStorageSync('userInfo')

      this.setData({ gender, nickname })
   }
})