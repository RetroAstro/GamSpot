// props 可以是从外部传入的动态数据
// slot 可以达到类似 render props 的效果

/**
 * 页面与自定义组件通信
 * <component-tag-name bindmyevent="onMyEvent" />
 * this.triggerEvent('myevent', {})
 */

// 引用 import、include
// 模版 template

Component({
   externalClasses: [],
   options: {
      multipleSlots: true
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

   },
   methods: {
      
   }
})