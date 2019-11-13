const regeneratorRuntime = require('../../lib/runtime')
const { uploadImage, sendNewPost } = require('../../api/index')
const { actions } = require('../../store/index')
const { formatText, showModal } = require('../../utils/index')

Page({
  props: {
    content: ''
  },
  data: {
    disabled: true,
    showImagePicker: true,
    info: {},
    imagePaths: []
  },
  onLoad({ id, name }) {
    this.setData({ info: { id, name } })
  },
  handleInput({ detail: { value } }) {
    this.saveContent(value)
    this.setDisabled(value)
  },
  saveContent(value) {
    this.props.content = formatText(value)
  },
  setDisabled(value) {
    if (value.trim() && this.data.disabled) {
      this.setData({ disabled: false })
    }
    if (!value.trim() && !this.data.disabled) {
      this.setData({ disabled: true })
    }
  },
  chooseImage() {
    let self = this

    qq.chooseImage({
      success({ tempFilePaths }) {
        if (self.checkImageFormat(tempFilePaths)) {
          let imagePaths = self.data.imagePaths.concat(tempFilePaths)

          if (imagePaths.length > 9) {
            showModal({ title: '最多只能上传 9 张图片' })
          } else {
            self.setData({
              imagePaths,
              ...(imagePaths.length == 9 ? { showImagePicker: false } : {})
            })
          }
        } else {
          showModal({ title: '暂未支持上传该格式的图片' })
        }
      }
    })
  },
  checkImageFormat(images) {
    return images.every(image => image.match(/.(png|jpg|JPG|PNG)$/gi))
  },
  async tapPublish() {
    qq.showLoading({ title: '等待中', mask: true })

    try {
      await this.publishNewPost()

      this.handlePrevPage()

      actions.publishNewPost(this.data.info.id)

      qq.navigateBack({ delta: 1 })
    } catch (err) {
      showModal({ title: '发布失败' })
    }

    qq.hideLoading()
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
