Component({
  externalClasses: [],
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    item: {
      type: Object,
      value: {
        id: '',
        author: {
          id: '',
          gender: '',
          nickname: ''
        },
        commentId: '',
        createdTime: '',
        content: '',
        agreeCount: 0,
        isAgree: false,
        childComments: [
          {
            id: '',
            sender: '',
            content: '',
            recipient: ''
          }
        ]
      }
    }
  },
  data: {
    active: false,
    isAgree: false,
    agreeCount: 0
  },
  lifetimes: {
    attached() {},
    detached() {}
  },
  pageLifetimes: {
    show() {},
    hide() {}
  },
  methods: {
    onReply(e) {
      let { pid, nickname } = e.currentTarget.dataset

      this.triggerEvent('comment', { data: { pid, nickname } })
    }
  }
})
