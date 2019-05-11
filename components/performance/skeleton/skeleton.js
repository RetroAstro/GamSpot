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
      async ready() {
         let data = await this.drawSkeleton()

         this.setData(data)
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
      async drawSkeleton() {
         let [
            selectorTop,
            rectList,
            circleList
         ] = await Promise.all([this.getSelectorTop(), this.getRectList(), this.getCircleList()])

         return {
            rectList: rectList.map(item => ({ ...item, top: item.top - selectorTop })),
            circleList: circleList.map(item => ({ ...item, top: item.top - selectorTop }))
         }
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