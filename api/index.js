const {
   GET_FRESH_JWT,
   SEND_BIND_DATA
} = require('./config')

const getToken = () => qq.getStorageSync('jwt').token

const setFreshJWT = () => {
   qq.showLoading({ title: '加载中' })
   
   return new Promise(resolve => {
      qq.login({
         success({ code }) {
            qq.request({
               url: GET_FRESH_JWT,
               method: 'POST',
               data: { code },
               success(res) {
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

module.exports = {
   setFreshJWT,
   sendBindData
}