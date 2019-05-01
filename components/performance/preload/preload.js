Component({
   externalClasses: [],
   options: {
      multipleSlots: true,
      addGlobalClass: true
   },
   properties: {
      src: {
         type: String,
         value: '',
         observer(value) {
            this.preloadImage(value)
         }
      },
      needRatio: {
         type: Boolean,
         value: false
      }
   },
   data: {
      imgUrl: ''
   },
   lifetimes: {
      attached() {

      },
      detached() {

      }
   },
   pageLifetimes: {
      show() {
         
      },
      hide() {

      }
   },
   methods: {
      preloadImage(value) {
         let self = this

         qq.getImageInfo({
            src: value,
            success(res) {
               self.checkRatio(res)
               self.setData({ imgUrl: res.path })
            }
         })
      },
      checkRatio({ width, height }) {
         this.properties.needRatio ? this.triggerEvent('setratio', { data: width / height }) : null
      }
   }
})