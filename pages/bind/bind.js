const { sendBindData } = require('../../api/index')

Page({
   onLoad() {
      sendBindData()
      .then(res => {
         console.log(res)
      })
   }
})