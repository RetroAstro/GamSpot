// props 可以是从外部传入的动态数据
// slot 可以达到类似 render props 的效果

/**
 * 页面与自定义组件通信
 * <component-tag-name bindmyevent="onMyEvent" />
 * this.triggerEvent('myevent', {})
 */

// 引用 import、include
// 模版 template

/**
 * 用户头像、昵称、发布时间
 * 圈话内容、图片
 * 点赞、评论、收藏
 */

Component({
   externalClasses: [],
   options: {
      multipleSlots: true,
      addGlobalClass: true
   },
   properties: {
      myProperty: {
         type: String,
         value: '',
         observer(newVal, oldVal) {
            
         }
      },
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
      photos: [
         {
            ratio: .8,
            url: '../../images/column.jpg'
         }
      ]
   },
   methods: {
      
   }
})