const regeneratorRuntime = require('../../lib/runtime')
const { uploadImage, sendNewPost } = require('../../api/index')
const { actions } = require('../../store/index')

Page({
   props: {
      content: ''
   },
   data: {
      disabled: true,
      showImagePicker: true,
      info: {},
      imagePaths: [],
   },
   onLoad({ id, name }) {
      this.setData({ info: { id, name } })
   },
   handleInput({ detail: { value } }) {
      this.saveContent(value)
      this.setDisabled(value)
   },
   saveContent(value) {
      this.props.content = value
   },
   setDisabled(value) {
      if (value.trim() && this.data.disabled) this.setData({ disabled: false })
      if (!value.trim() && !this.data.disabled) this.setData({ disabled: true })
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
      return images.every(image => image.match(/.(png|jpg|JPG|PNG)$/gi))
   },
   async tapPublish() {
      qq.showLoading({ title: '等待中', mask: true })

      await this.publishNewPost()

      this.handlePrevPage()

      actions.publishNewPost(this.data.info.id)

      qq.hideLoading()
      
      qq.navigateBack({ delta: 1 })
   },
   async publishNewPost() {
      let post = {
         content: this.props.content,
         socialCircleId: this.data.info.id,
         images: await this.getImageKeys(this.data.imagePaths)
      }
      
      await sendNewPost(post)
   },
   async getImageKeys(imagePaths) {
      let imageKeys = []

      for (let imagePath of imagePaths) {
         imageKeys.push(await uploadImage(imagePath))
      }
      
      return imageKeys
   },
   handlePrevPage() {
      let pages = getCurrentPages()
      let prevPage = pages[pages.length - 2]
      
      prevPage.props.pageNum = 1
   }
})