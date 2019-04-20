const opts = () => ({
   method: 'POST',
   header: {
      'Authorization': 'Bearer ' + qq.getStorageSync('userInfo').token
   }
})

module.exports = {
   opts
}