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
   data: {

   },
   methods: {
      
   }
})