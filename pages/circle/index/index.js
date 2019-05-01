const { actions, subscribe } = require('../../../store/index')

Page({
   data: {
      showSkeleton: true,
      circles: [
         {
            avatarUrl: "http://image.mashiroc.fun/blog/initAvatar.png",
            id: 6,
            isJoin: true,
            joinCount: 1111,
            name: "燃烧卡路里",
            talkingCount: 2222,
            top: []
         },
         {
            avatarUrl: "http://image.mashiroc.fun/blog/initAvatar.png",
            id: 6,
            isJoin: true,
            joinCount: 1111,
            name: "燃烧卡路里",
            talkingCount: 2222,
            top: []
         },
         {
            avatarUrl: "http://image.mashiroc.fun/blog/initAvatar.png",
            id: 6,
            isJoin: true,
            joinCount: 1111,
            name: "燃烧卡路里",
            talkingCount: 2222,
            top: []
         },
         {
            avatarUrl: "http://image.mashiroc.fun/blog/initAvatar.png",
            id: 6,
            isJoin: true,
            joinCount: 1111,
            name: "燃烧卡路里",
            talkingCount: 2222,
            top: []
         },
         {
            avatarUrl: "http://image.mashiroc.fun/blog/initAvatar.png",
            id: 6,
            isJoin: true,
            joinCount: 1111,
            name: "燃烧卡路里",
            talkingCount: 2222,
            top: []
         },
         {
            avatarUrl: "http://image.mashiroc.fun/blog/initAvatar.png",
            id: 6,
            isJoin: true,
            joinCount: 1111,
            name: "燃烧卡路里",
            talkingCount: 2222,
            top: []
         },
         {
            avatarUrl: "http://image.mashiroc.fun/blog/initAvatar.png",
            id: 6,
            isJoin: true,
            joinCount: 1111,
            name: "燃烧卡路里",
            talkingCount: 2222,
            top: []
         },
         {
            avatarUrl: "http://image.mashiroc.fun/blog/initAvatar.png",
            id: 6,
            isJoin: true,
            joinCount: 1111,
            name: "燃烧卡路里",
            talkingCount: 2222,
            top: []
         }
      ]
   },
   onLoad() {
      this.connectStore()

      actions.fetchCircles()
   },
   onUnload() {
      this.unsubscribe()
   },
   connectStore() {
      let self = this
      this.unsubscribe = subscribe(getState => self.handleState(getState()))
   },
   handleState({ circles }) {
      this.setData({ circles, showSkeleton: false })
   },
   onNavigate(e) {
      let item = e.currentTarget.dataset.item
      
      qq.navigateTo({ url: `/pages/circle/single/single?params=${JSON.stringify(item)}` })
   }
})