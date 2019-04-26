const { throttle } = require('../../utils/index')

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
            author: {
               id: '',
               gender: '',
               nickname: '',
            },
            createdTime: '',
            circleName: '',
            content: '',
            images: [],
            commitCount: 0,
            agreeCount: 0,
            collectionCount: 0,
            isAgree: false,
            isCollection: false,
            isTop: false
         }
      }
   },
   data: {
      like: {
         active: false,
         isAgree: false,
         agreeCount: 662
      },
      collect: {
         active: false,
         isCollection: false,
         collectionCount: 662
      }
   },
   lifetimes: {
      attached() {
         
      },
      detached() {

      },
   },
   pageLifetimes: {
      show() {
         
      },
      hide() {

      }
   },
   methods: {
      tapPost() {
         this.triggerEvent('navigate', { data: 'post' })
      },
      tapCircle() {
         this.triggerEvent('navigate', { data: 'circle' })
      },
      tapComment() {
         this.triggerEvent('navigate', { data: 'comment' })
      },
      tapInteract: throttle((self, e) => {
         let key = e.currentTarget.dataset.event
         let action = self.getAction(key)

         action.run()
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
      }
   }
})