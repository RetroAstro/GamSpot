const { promisify } = require('../utils/index')

const {
   GET_FRESH_JWT,
   SEND_BIND_DATA,
   SELECT_GENDER
} = require('./urls')

const basic = () => ({
   method: 'POST',
   header: {
      'Authorization': 'Bearer ' + qq.getStorageSync('jwt').token
   }
})

const setFreshJWT = promisify(resolve => {
   qq.showLoading()
   
   qq.login({
      success({ code }) {
         qq.request({
            url: GET_FRESH_JWT,
            method: 'POST',
            data: { code },
            success(res) {
               if (!res.data.data) return

               let { exp, sub } = JSON.parse(atob(res.data.data.split('.')[1]))
               qq.setStorageSync('jwt', { exp, sub, token: res.data.data })
               qq.hideLoading()
               resolve()
            }
         })
      }
   })
})

const sendBindData = promisify((data, resolve) => {
   qq.getUserInfo({
      withCredentials: true,
      success({ iv, encryptedData, signature }) {
         qq.request({
            ...basic(),
            url: SEND_BIND_DATA,
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

const sendGender = promisify((gender, resolve) => {
   qq.request({
      ...basic(),
      url: SELECT_GENDER,
      data: gender,
      success({ data }) {
         resolve(data)
      }
   })
})

const resetAllData = () => {
   qq.request({
      ...basic(),
      url: 'http://111.230.169.17:8080/miniapp/refreshDB',
      success(res) {
         console.log(res)
      }
   })
}

module.exports = {
   setFreshJWT,
   sendBindData,
   sendGender,
   resetAllData
}