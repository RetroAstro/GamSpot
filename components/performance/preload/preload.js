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
            this.isCached(value) ? this.setData({ imgUrl: value }) : this.preloadImage(value)
         }
      },
      index: {
         type: Number,
         value: 0,
      },
      mode: {
         type: String,
         value: 'scaleToFill'
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
      isCached(image) {
         return image.includes('tmp')
      },
      preloadImage(value) {
         let self = this

         qq.getImageInfo({
            src: value,
            success({ path, width, height }) {
               self.checkRatio(width, height)
               self.loaded(path)
               self.setData({ imgUrl: path })
            }
         })
      },
      loaded(path) {
         this.triggerEvent('loaded', { data: { path, index: this.properties.index } })
      },
      checkRatio(width, height) {
         if (this.properties.needRatio) this.triggerEvent('setratio', { data: width / height })
      }
   }
})