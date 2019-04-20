const { actions, subscribe } = require('../../../store/index')

Page({
   data: {
      mark: '',
      info: {},
      postItem: {
         gender: 1,
         nickname: '想那些阿布',
         createdTime: '08:42',
         circleName: '',
         content: '拥有交互思维的视觉设计师，拥有了在产品层面讨论问题的能力，更多的交流能弥补信息不对称话语权。',
         images: [
            {
               ratio: 1,
               url: '../../images/row.jpg'
            }
         ],
         agreeCount: 666,
         commitCount: 666,
         collectionCount: 666,
         isAgree: true,
         isCollection: true,
         isTop: false
      }
   },
   onLoad({ params }) {
      qq.hideTabBar()

      let self = this
      this.unsubscribe = subscribe(getState => self.handleState(getState()))

      this.renderCircleInfo(JSON.parse(params))
   },
   onUnload() {
      qq.showTabBar()
      this.unsubscribe()
   },
   onNavigate({ detail: { data } }) {
      qq.navigateTo({ url: `/pages/circle/detail/detail?tag=${data}` })
   },
   onTap() {
      this.setData({
         mark: 'join'
      }, () => actions.joinCircle(this.data.info.id))
   },
   handleState({ circles }) {
      circles.map(item => item.id === this.data.info.id ? this.setData({ info: { ...item } }) : null)
   },
   renderCircleInfo(info) {
      this.setData({ info })
   }
})