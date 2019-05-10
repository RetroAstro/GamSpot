Component({
   externalClasses: [],
   options: {
      multipleSlots: true,
      addGlobalClass: true
   },
   properties: {
      showReply: Boolean
   },
   data: {
      disabled: true
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
      hideReplyBox() {
         this.triggerEvent('reply', { data: 'hide' })
      },
      handleFixed() {
         this.triggerEvent('reply', { data: 'fixed' })
      },
      handleInput({ detail: { value } }) {
         if (value.trim() && this.data.disabled) {
            this.setData({ disabled: false })
         }
         if (!value.trim() && !this.data.disabled) {
            this.setData({ disabled: true })
         }
      }
   }
})