Component({
   externalClasses: [],
   options: {
      multipleSlots: true,
      addGlobalClass: true
   },
   properties: {
      selector: {
         type: String,
         value: 'skeleton'
      },
      showSkeleton: {
         type: Boolean,
         value: true
      }
   },
   data: {
      show: true,
      rectLists: [],
      circleLists: []
   },
   lifetimes: {
      attached() {

      },
      ready() {
         this.drawRect()
         this.drawCircle()
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
      drawRect() {
         let self = this

         qq.createSelectorQuery()
         .selectAll(`.${this.properties.selector} >>> .${this.properties.selector}-rect`)
         .boundingClientRect()
         .exec(([ rectLists ]) => self.setData({ rectLists }))
      },
      drawCircle() {
         let self = this 

         qq.createSelectorQuery()
         .selectAll(`.${this.properties.selector} >>> .${this.properties.selector}-radius`)
         .boundingClientRect()
         .exec(([ circleLists ]) => self.setData({ circleLists }))
      },
      hideSkeleton() {
         this.setData({ show: false })
      }
   }
})