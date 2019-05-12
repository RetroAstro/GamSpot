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
            commentId: '',
            createdTime: '',
            content: '',
            agreeCount: 0,
            isAgree: false,
            childComments: [
               {
                  id: '',
                  sender: '',
                  content: '',
                  recipient: ''
               }
            ]
         }
      }
   },
   data: {
      active: false,
      isAgree: false,
      agreeCount: 0
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
      onReply(e) {
         let { pid, nickname } = e.currentTarget.dataset
         
         this.triggerEvent('comment', { data: { pid, nickname } })
      },
      tapLike: throttle((self) => {
         let { isAgree, agreeCount } = self.data

         self.setData({
            active: false,
            isAgree: !isAgree,
            agreeCount: isAgree ? agreeCount - 1 : agreeCount + 1
         }, () => self.setData({ active: true }))
      }, 500)
   }
})