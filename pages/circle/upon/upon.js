Page({
   data: {
      isFixed: false,
      showReply: false,
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
         isTop: true
      },
      commentItem: {
         gender: 1,
         nickname: '想那些阿布',
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
   onNavigate({ detail: { data } }) {
      if (data === 'post') {

      }
      else if (data === 'comment') {
         this.setData({ showReply: true })
      }
   },
   onReply({ detail: { data } }) {
      if (data === 'hide') {
         this.setData({ showReply: false })
      }
      else if (data === 'fixed') {
         this.setData({ isFixed: !this.data.isFixed })
      }
   }
})