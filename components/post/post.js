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
      navigate() {
         this.triggerEvent('navigate')
      }
   }
})