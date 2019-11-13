const { sendGender } = require('../../api/index')
const { showModal } = require('../../utils/index')

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
      sendGender({ gender }).then(() => {
        this.saveGender(gender)

        qq.switchTab({ url: '/pages/popular/popular' })
      })
    } else {
      showModal({ title: '您还未选择性别呢' })
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
