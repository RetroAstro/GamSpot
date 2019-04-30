Page({
   data: {
      isFixed: false,
      showReply: false,
      postItem: {
         author: {
            id: '',
            gender: 1,
            nickname: 'RetroAstro'
         },
         createdTime: '08:42',
         circleName: '',
         content: '拥有交互思维的视觉设计师，拥有了在产品层面讨论问题的能力，更多的交流能弥补信息不对称话语权。',
         images: ['https://wx.idsbllp.cn/234/miniapp/talks/picture/d5838ba2b5cb4468d62dcf903fdc5bc2.jpg'],
         agreeCount: 666,
         commitCount: 666,
         collectionCount: 666,
         isAgree: true,
         isCollection: true,
         isTop: false
      },
      commentItem: {
         author: {
            id: '',
            gender: 1,
            nickname: 'RetroAstro'
         },
         createdTime: '16:32',
         content: '拥有交互思维的视觉设计师，拥有了在产品层面讨论问题的能力，更多的交流能弥补信息不对称话语权。',
         agreeCount: 66,
         isAgree: true,
         comments: [
            {
               sender: '闪电',
               recipient: '想那些阿布',
               content: '拥有交互思维的视觉设计师，拥有了在产品层面讨论问题的能力，更多的交流能弥补信息不对称话语权。'
            }
         ]
      }
   },
   onLoad({ tag }) {
      tag === 'comment' ? this.scrollToComment() : null
   },
   onNavigate({ detail: { data } }) {
      data === 'comment' ? this.setData({ showReply: true }) : null
   },
   onReply({ detail: { data } }) {
      let action = this.getAction(data)

      action.run()
   },
   getAction(key) {
      let actions = {
         hide: () => this.setData({ showReply: false }),
         fixed: () => this.setData({ isFixed: !this.data.isFixed })
      }
      
      return { run: actions[key] }
   },
   scrollToComment() {
      let query = qq.createSelectorQuery()
      
      query
      .select('.post-box')
      .boundingClientRect()
      .exec(([{ height }]) => qq.pageScrollTo({ scrollTop: height }))
   }
})