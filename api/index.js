const { opts } = require('./config')
const { promisify } = require('../utils/index')
const { Base64 } = require('../utils/base64')

const {
   GET_FRESH_JWT,
   SEND_BIND_DATA,
   SELECT_GENDER,
   GET_ALL_CIRCLES,
   UPLOAD_IMAGE,
   SEND_NEW_POST,
   RESET_ALL_DATA
} = require('./urls')

const setFreshJWT = promisify((resolve) => {
   qq.showLoading()
   
   qq.login({
      success({ code }) {
         qq.request({
            url: GET_FRESH_JWT,
            method: 'POST',
            data: { code },
            success({ data: { status, data } }) {
               if (status !== 10000) return
               
               let { exp, sub, gender, nickname } = JSON.parse(Base64.decode(data.split('.')[1]))
               
               qq.setStorageSync('userInfo', { exp, sub, gender, nickname, token: data })
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
            ...opts(),
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
      ...opts(),
      url: SELECT_GENDER,
      data: gender,
      success(res) {
         resolve(res.data)
      }
   })
})

const getCircles = promisify((resolve) => {
   qq.request({
      ...opts(),
      url: GET_ALL_CIRCLES,
      method: 'GET',
      success({ data: { status, data } }) {
         if (status === 10000) {
            resolve(data)
         }
      }
   })
})

const sendCircleId = promisify((id, resolve) => {
   qq.request({
      ...opts(),
      url: `${GET_ALL_CIRCLES}/${id}/joining`,
      success({ data: { status } }) {
         if (status === 10000) {
            resolve()
         }
      }
   })
})

const uploadImage = promisify((imagePath, resolve) => {
   qq.uploadFile({
      ...opts(),
      url: UPLOAD_IMAGE,
      filePath: imagePath,
      name: 'file',
      success(res) {
         let { status, data } = JSON.parse(res.data)
         
         if (status === 10000) {
            resolve(data)
         }
      }
   })
})

const sendNewPost = promisify((data, resolve) => {
   qq.request({
      ...opts(),
      url: SEND_NEW_POST,
      data,
      success({ data: { status } }) {
         if (status === 10000) {
            resolve()
         }
      }
   })
})

const resetAllData = () => {
   qq.request({
      ...opts(),
      url: RESET_ALL_DATA,
      success(res) {
         console.log(res)
      }
   })
}

module.exports = {
   setFreshJWT,
   sendBindData,
   sendGender,
   getCircles,
   sendCircleId,
   uploadImage,
   sendNewPost,
   resetAllData
}