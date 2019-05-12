const regeneratorRuntime = require('../../../lib/runtime')
const { sendComment } = require('../../../api/index')
const { actions } = require('../../../store/index')
const { formatText } = require('../../../utils/index')

Component({
   externalClasses: [],
   options: {
      multipleSlots: true,
      addGlobalClass: true
   },
   properties: {
      showReply: Boolean,
      circleId: Number,
      postId: Number,
      content: String,
      recipient: Object
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
         this.saveContent(value)
         this.setDisabled(value)
      },
      saveContent(value) {    
         this.properties.content = formatText(value)
      },
      setDisabled(value) {
         if (value.trim() && this.data.disabled) {
            this.setData({ disabled: false })
         }
         if (!value.trim() && !this.data.disabled) {
            this.setData({ disabled: true })
         }
      },
      async postComment() {
         let { content, circleId, postId, recipient: { pid } } = this.properties
         let comment = { content, pid, socialCircleId: circleId }

         qq.showLoading({ title: '等待中', mask: true })

         await sendComment(comment)

         actions.fetchSolePost(postId)

         qq.hideLoading()

         this.hideReplyBox()
      }
   }
})