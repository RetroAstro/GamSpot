const moment = require('../../lib/moment/index')
const { setFreshJWT, resetAllData } = require('../../api/index')

Page({
  onLoad() {
    let userInfo = qq.getStorageSync('userInfo') || {}

    this.routeSwitch(userInfo)
  },
  routeSwitch({ exp, sub, gender }) {
    if (!sub || sub === 'guest') {
      setFreshJWT().then(() => qq.redirectTo({ url: '/pages/auth/auth' }))
    }
    else if (!gender && sub === 'student') {
      qq.redirectTo({ url: '/pages/avatar/avatar' })
    }
    else if (exp < moment().unix()) {
      setFreshJWT().then(() => qq.switchTab({ url: '/pages/popular/popular' }))
    }
    else {
      qq.switchTab({ url: '/pages/popular/popular' })
    }
  }
})
