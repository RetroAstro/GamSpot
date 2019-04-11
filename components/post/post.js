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
            gender: '',
            nickname: '',
            createdTime: '',
            top: '',
            circleName: '',
            content: '',
            images: [],
            agreeCount: 0,
            commitCount: 0,
            collectionCount: 0,
            isAgree: false,
            isCollection: false
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