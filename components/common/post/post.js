const { throttle } = require('../../../utils/index')

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
         observer({ images = [] }) {
            let show = this.properties.isSole

            if (!this.isImagesLoaded()) {
               this.setData({
                  imageItems: images.map(item => ({ show, url: item }))
               })
            }

            this.handleCached(images)
         }
      },
      imagePaths: {
         type: Array,
         value: []
      },
      isSole: {
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
         this.initialize()
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
      tapCircle() {
         this.triggerEvent('navigate', { data: 'circle' })
      },
      tapPost() {
         this.triggerEvent('navigate', { data: { tag: 'post', post: this.createCachedPost() } })
      },
      tapComment() {
         this.triggerEvent('navigate', { data: { tag: 'comment', post: this.createCachedPost() } })
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
      }, 500),
      getAction(key) {
         let { like: { isAgree, agreeCount }, collect: { isCollection, collectionCount } } = this.data

         let actions = {
            like: () => this.likeAction(isAgree, agreeCount),
            collect: () => this.collectAction(isCollection, collectionCount)
         }

         return { run: actions[key] }
      },
      likeAction(isAgree, agreeCount) {
         this.setData({
            'like.active': false,
            'like.isAgree': !isAgree,
            'like.agreeCount': isAgree ? agreeCount - 1 : agreeCount + 1
         }, () => this.setData({ 'like.active': true }))
      },
      collectAction(isCollection, collectionCount) {
         this.setData({
            'collect.active': false,
            'collect.isCollection': !isCollection,
            'collect.collectionCount': isCollection ? collectionCount - 1 : collectionCount + 1
         }, () => this.setData({ 'collect.active': true }))
      },
      initialize() {
         let { item: { isAgree, agreeCount, isCollection, collectionCount } } = this.properties

         this.setData({ like: { isAgree, agreeCount }, collect: { isCollection, collectionCount } })
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