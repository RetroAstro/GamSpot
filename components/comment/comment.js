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
            content: '',
            agreeCount: 0,
            isAgree: false,
            comments: [
               {
                  sender: '',
                  recipient: '',
                  content: ''
               }
            ]
         }
      }
   },
   data: {
      active: false,
      isAgree: false,
      agreeCount: 66
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
      tapLike: throttle((self) => {
         let { isAgree, agreeCount } = self.data

         self.setData({
            'active': false,
            'isAgree': !isAgree,
            'agreeCount': isAgree ? agreeCount - 1 : agreeCount + 1
         }, () => self.setData({ 'active': true }))
      }, 500)
   }
})