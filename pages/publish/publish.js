const regeneratorRuntime = require('../../lib/runtime')
const { uploadImage, sendNewPost } = require('../../api/index')
const { actions } = require('../../store/index')

Page({
   data: {
      disabled: true,
      showImagePicker: true,
      info: {},
      content: '',
      imagePaths: [],
   },
   onLoad({ id, name }) {
      this.setData({ info: { id, name } })
   },
   handleInput({ detail: { value } }) {
      if (value.trim() && this.data.disabled) this.setData({ disabled: false })
      if (!value.trim() && !this.data.disabled) this.setData({ disabled: true })
   },
   handleBlur({ detail: { value } }) {
      this.setData({ content: value })
   },
   chooseImage() {
      let self = this
      
      qq.chooseImage({
         success({ tempFilePaths }) {
            if (self.checkImageFormat(tempFilePaths)) {
               let imagePaths = self.data.imagePaths.concat(tempFilePaths)

               imagePaths.length === 9 ? self.setData({ imagePaths, showImagePicker: false }) : self.setData({ imagePaths })
            } else {
               qq.showModal({
                  title: '只支持上传 JPG 与 PNG 格式的图片！',
                  showCancel: false,
                  confirmColor: '#24292E'
               })
            }
         }
      })
   },
   checkImageFormat(images) {
      return images.every(image => image.match(/http:\/\/.*?(png|jpg)/gi))
   },
   tapPublish() {
      (async () => {
         qq.showLoading()

         await this.sendNewPost()()

         actions.publishNewPost(this.getPayload())

         qq.hideLoading()

         qq.navigateBack({ delta: 1 })
      })()
   },
   sendNewPost() {
      return async () => {
         let post = {
            content: this.data.content,
            socialCircleId: this.data.info.id,
            images: await this.getImageKeys(this.data.imagePaths)
         }
         
         await sendNewPost(post)
      }
   },
   getImageKeys(imagePaths) {
      return new Promise((resolve) => {
         (async () => {
            resolve(
               await Promise.all(imagePaths.map(imagePath => uploadImage(imagePath)))
            )
         })()
      })
   },
   getPayload() {
      return {
         id: this.data.info.id,
         content: this.data.content,
         images: this.data.imagePaths
      }
   }
})