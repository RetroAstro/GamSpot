Page({
  data: {
    default: {
      bell: '新增了圈话',
      like: '赞了你的圈话',
      replyPost: '评论了你的圈话',
      replyComment: '回复了你的圈话'
    },
    notices: [
      {
        type: 'bell',
        name: '阿布',
        time: '14:23',
        checked: false
      },
      {
        type: 'like',
        name: '阿布',
        time: '14:23',
        checked: false
      },
      {
        type: 'replyPost',
        name: '阿布',
        time: '14:23',
        checked: true
      },
      {
        type: 'replyComment',
        name: '阿布',
        time: '14:23',
        checked: true
      }
    ]
  },
  onLoad() {}
})
