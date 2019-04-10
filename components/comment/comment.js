
/**
 * 页面与自定义组件通信
 * <component-tag-name bindmyevent="onMyEvent" />
 * this.triggerEvent('myevent', {})
 */

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
            nickname: '想那些阿布',
            createdTime: '16:32',
            content: '拥有交互思维的视觉设计师，拥有了在产品层面讨论问题的能力，更多的交流能弥补信息不对称话语权。',
            agreeCount: 66,
            isAgree: true,
            comments: [
               {
                  sender: '闪电',
                  recipient: '想那些阿布',
                  content: '拥有交互思维的视觉设计师，拥有了在产品层面讨论问题的能力，更多的交流能弥补信息不对称话语权。'
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