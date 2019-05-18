const { throttle } = require('../../../utils/index')
const { actions } = require('../../../store/index')

const {
   sendLikeStatus,
   sendCollectStatus
} = require('../../../api/index')

Component({
   externalClasses: [],
   options: {
      multipleSlots: true,
      addGlobalClass: true
   },
   properties: {
      item: {
         type: Object,
         value: {
            id: '',
            author: {
               id: '',
               gender: '',
               nickname: '',
            },
            createdTime: '',
            circleId: '',
            circleName: '',
            content: '',
            images: [],
            commitCount: 0,
            agreeCount: 0,
            collectionCount: 0,
            isAgree: false,
            isCollection: false,
            isTop: false
         },
         observer(newVal, oldVal) {
            this.observeImages(newVal)
            this.observeActions(newVal, oldVal)
         }
      },
      imagePaths: {
         type: Array,
         value: []
      },
      isSole: {
         type: Boolean,
         value: false
      },
      isSingle: {
         type: Boolean,
         value: false
      }
   },
   data: {
      ratio: 1,
      imageItems: [],
      like: {
         active: false,
         isAgree: false,
         agreeCount: 0
      },
      collect: {
         active: false,
         isCollection: false,
         collectionCount: 0
      }
   },
   lifetimes: {
      attached() {

      },
      ready() {
         if (!this.properties.isSole) {
            this.setLazyload()
         }
      },
      detached() {

      }
   },
   pageLifetimes: {
      show() {
         
      },
      hide() {

      }
   },
   methods: {
      observeImages({ images = [] }) {
         let show = this.properties.isSole

         if (!this.isImagesLoaded()) {
            this.setData({
               imageItems: images.map(item => ({ show, url: item }))
            })
         }

         this.handleCached(images)
      },
      observeActions(newVal, oldVal) {
         let { isAgree, agreeCount, isCollection, collectionCount } = newVal

         let data = {
            like: { isAgree, agreeCount, active: isAgree !== oldVal.isAgree },
            collect: { isCollection, collectionCount, active: isCollection !== oldVal.isCollection }
         }

         this.setData(data)
      },
      tapPost() {
         this.triggerEvent('navigate', { data: { tag: 'post', post: this.createCachedPost() } })
      },
      tapComment() {
         this.triggerEvent('navigate', { data: { tag: 'comment', post: this.createCachedPost() } })
      },
      tapCircle() {
         this.triggerEvent('navigate', { data: { tag: 'circle', circleId: this.properties.item.circleId } })
      },
      tapPreload(e) {
         let { imagePaths } = this.properties
         let { index } = e.currentTarget.dataset

         if (this.isImagesLoaded()) {
            qq.previewImage({
               current: imagePaths[index],
               urls: imagePaths
            })
         }
      },
      tapInteract: throttle((self, e) => {
         let key = e.currentTarget.dataset.event
         let action = self.getAction(key)

         action.run()
         qq.vibrateShort()
      }, 600),
      getAction(key) {
         let actions = {
            like: () => this.likeAction(),
            collect: () => this.collectAction()
         }

         return { run: actions[key] }
      },
      likeAction() {
         this.setData({ 'like.active': false }, () => {
            actions.likeAction(this.properties.item.id, this.data.like.isAgree)

            sendLikeStatus(this.properties.item.id, this.data.like.isAgree)
         })
      },
      collectAction() {
         this.setData({ 'collect.active': false }, () => {
            actions.collectAction(this.properties.item.id, this.data.collect.isCollection)
            
            sendCollectStatus(this.properties.item.id, this.data.collect.isCollection)
         })
      },
      isImagesLoaded() {
         let { item: { images }, imagePaths } = this.properties
         let loadedImages = imagePaths.filter(item => item)

         return images.length === loadedImages.length
      },
      createCachedPost() {
         let { item, imagePaths } = this.properties
         let images = [...item.images]
         
         imagePaths.map((item, index) => item ? (images[index] = item) : null)

         return { ...item, images }
      },
      handleCached(images) {
         images.map((item, index) => {
            if (item.includes('tmp')) {
               this.properties.imagePaths[index] = item
            }
         })
      },
      handleLoaded({ detail: { data: { index, path } } }) {
         this.properties.imagePaths[index] = path
      },
      setRatio({ detail: { data } }) {
         this.setData({ ratio: data })
      },
      setLazyload() {
         const shouldLoad = ({ intersectionRatio }) => {
            return intersectionRatio > 0 && !this.data.imageItems.every(item => item.show)
         }

         this.createIntersectionObserver()
         .relativeToViewport()
         .observe('.user-box', (res) => {
            if (shouldLoad(res)) {
               this.setData({
                  imageItems: this.data.imageItems.map(item => item.url ? { ...item, show: true } : item)
               })
            }
         })
      }
   }
})