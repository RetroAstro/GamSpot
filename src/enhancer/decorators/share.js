const share = () => {
  let result = {
    onShareAppMessage() {
      return {
        title: '分享你的校园生活 ～',
        path: '/pages/buffer/buffer',
        imageUrl: '/images/screen.png'
      }
    }
  }

  return result
}

module.exports = share
