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
            gender: 1,
            nickname: '',
            createdTime: '',
            circleName: '',
            content: '',
            images: [],
            agreeCount: 0,
            commitCount: 0,
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
      tapComment() {
         this.triggerEvent('navigate', { data: 'comment' })
      },
      tapInteract: throttle((self, e) => {
         let key = e.currentTarget.dataset.event
         let { like: { isAgree, agreeCount }, collect: { isCollection, collectionCount } } = self.data
         
         if (key === 'like') {
            self.setData({
               'like.active': false,
               'like.isAgree': !isAgree,
               'like.agreeCount': isAgree ? agreeCount - 1 : agreeCount + 1
            }, () => self.setData({ 'like.active': true }))
         }
         else if (key === 'comment') {
            self.setData({
               'collect.active': false,
               'collect.isCollection': !isCollection,
               'collect.collectionCount': isCollection ? collectionCount - 1 : collectionCount + 1
            }, () => self.setData({ 'collect.active': true }))
         }
      }, 500)
   }
})