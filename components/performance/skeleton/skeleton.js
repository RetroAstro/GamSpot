const regeneratorRuntime = require('../../../lib/runtime')
const { promisify } = require('../../../utils/index')

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
      },
      setStyle: {
         type: String,
         value: ''
      }
   },
   data: {
      show: true,
      rectList: [],
      circleList: []
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
      async drawRect() {
         let selectorTop = await this.getSelectorTop()
         let rectList = await this.getRectList()

         this.setData({
            rectList: rectList.map(item => ({ ...item, top: item.top - selectorTop }))
         }, () => this.triggerEvent('drawn'))
      },
      async drawCircle() {
         let selectorTop = await this.getSelectorTop()
         let circleList = await this.getCircleList()
         
         this.setData({
            circleList: circleList.map(item => ({ ...item, top: item.top - selectorTop }))
         })
      },
      getSelectorTop() {
         const exec = promisify((resolve) => {
            qq.createSelectorQuery()
            .select(`.${this.properties.selector}`)
            .boundingClientRect()
            .exec(([{ top }]) => resolve(top))
         })

         return exec()
      },
      getRectList() {
         const exec = promisify((resolve) => {
            qq.createSelectorQuery()
            .selectAll(`.${this.properties.selector} >>> .skeleton-rect`)
            .boundingClientRect()
            .exec(([ rectList ]) => resolve(rectList))
         })

         return exec()
      },
      getCircleList() {
         const exec = promisify((resolve) => {
            qq.createSelectorQuery()
            .selectAll(`.${this.properties.selector} >>> .skeleton-radius`)
            .boundingClientRect()
            .exec(([ circleList ]) => resolve(circleList))
         })

         return exec()
      },
      hideSkeleton() {
         this.setData({ show: false })
      }
   }
})