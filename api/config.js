const opts = () => ({
   method: 'POST',
   header: {
      'Authorization': 'Bearer ' + qq.getStorageSync('jwt').token
   }
})

module.exports = {
   opts
}