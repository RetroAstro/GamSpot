const {
   GET_FRESH_JWT,
   SEND_BIND_DATA
} = require('./urls')

const getToken = () => qq.getStorageSync('jwt').token

const setFreshJWT = () => {
   qq.showLoading()
   
   return new Promise(resolve => {
      qq.login({
         success({ code }) {
            qq.request({
               url: GET_FRESH_JWT,
               method: 'POST',
               data: { code },
               success(res) {
                  if (!res.data.data) return
                  
                  var { exp, sub } = JSON.parse(atob(res.data.data.split('.')[1]))
                  qq.setStorageSync('jwt', { exp, sub, token: res.data.data })
                  qq.hideLoading()
                  resolve()
               }
            })
         }
      })
   })
}

const sendBindData = data => {
   return new Promise(resolve => {
      qq.getUserInfo({
         withCredentials: true,
         success({ iv, encryptedData, signature }) {
            qq.request({
               url: SEND_BIND_DATA,
               method: 'POST',
               header: {
                  'Authorization': 'Bearer ' + getToken()
               },
               data: {
                  iv,
                  encryptedData,
                  signature,
                  student: data
               },
               success (res) {
                  resolve(res.data)
               }
            })
         }
      })
   })
}

const resetAllData = () => {
   qq.request({
      url: 'http://111.230.169.17:8080/miniapp/refreshDB',
      method: 'POST',
      success(res) {
         console.log(res)
      }
   })
}

module.exports = {
   setFreshJWT,
   sendBindData,
   resetAllData
}