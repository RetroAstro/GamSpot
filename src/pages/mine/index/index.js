const regeneratorRuntime = require('../../../lib/runtime')
const { editNickname } = require('../../../api/index')
const { showModal } = require('../../../utils/index')

Page({
  data: {
    gender: '',
    nickname: ''
  },
  onLoad() {
    let { gender, nickname } = qq.getStorageSync('userInfo')

    this.setData({ gender, nickname })
  },
  async editNickname({ detail: { value } }) {
    let title = '修改成功'
    let nickname = value.trim()

    if (nickname) {
      await editNickname({ nickname }).catch(() => title = '修改失败')
    } else {
      title = '昵称不能为空'
    }

    showModal({ title })
  }
})
