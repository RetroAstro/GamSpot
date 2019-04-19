Page({
   data: {
      postItem: {
         gender: 1,
         nickname: '想那些阿布',
         createdTime: '08:42',
         circleName: '摄影',
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
   onNavigate({ detail: { data } }) {
      let route = this.getRoute(data)
      
      route.navigate()
   },
   getRoute(key) {
      let routes = {
         post: () => qq.navigateTo({ url: '/pages/circle/detail/detail?tag=post' }),
         comment: () => qq.navigateTo({ url: '/pages/circle/detail/detail?tag=comment' }),
         circle: () => null
      }

      return { navigate: routes[key] }
   }
})