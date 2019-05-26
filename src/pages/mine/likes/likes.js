const { actions } = require('../../../store/index')
const { postItems } = require('../../../mock/index')
const { enhance } = require('../../../enhancer/index')
const { INFOLIST } = require('../../../enhancer/types')

const likes = {
  data: {
    dataList: [postItems]
  },
  onLoad() {
    actions.fetchLikedPosts()
  },
  onNavigate({ detail: { data } }) {
    let params = { ...data, circleId: data.post.circleId }

    qq.navigateTo({ url: `/pages/circle/detail/detail?params=${encodeURIComponent(JSON.stringify(params))}` })
  },
  fetchDataList() {
    actions.fetchLikedPosts()
  },
  appendDataList() {
    actions.fetchLikedPosts(++this.props.pageNum)
  },
  handleState({ posts, likedPosts }) {
    let postIds = likedPosts[this.props.pageNum - 1]
    let postItems = postIds.map(id => posts.byId[id])

    let data = this.updateDataList(postIds, postItems)

    this.setData(data, this.hideSkeleton)
  }
}

Page(enhance(likes, { type: INFOLIST }))
