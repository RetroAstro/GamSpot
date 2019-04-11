Page({
   data: {
      mark: 'join',
      postItem: {
         gender: '',
         nickname: '想那些阿布',
         createdTime: '08:42',
         top: '',
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
         isCollection: true
      }
   },
   onTap() {
      this.setData({
         mark: 'publish'
      })
   },
   onLoad() {
      qq.hideTabBar()
   }
})