const { actions } = require('../../../store/index')
const { postItems } = require('../../../mock/index')
const { enhance } = require('../../../enhancer/index')
const { INFOLIST } = require('../../../enhancer/types')

const collects = {
  data: {
    dataList: [postItems]
  },
  onLoad() {
    actions.fetchCollectedPosts()
  },
  onNavigate({ detail: { data } }) {
    let params = { ...data, circleId: data.post.circleId }

    qq.navigateTo({ url: `/pages/circle/detail/detail?params=${encodeURIComponent(JSON.stringify(params))}` })
  },
  fetchDataList() {
    actions.fetchCollectedPosts()
  },
  appendDataList() {
    actions.fetchCollectedPosts(++this.props.pageNum)
  },
  handleState({ posts, collectedPosts }) {
    let postIds = collectedPosts[this.props.pageNum - 1]
    let postItems = postIds.map(id => posts.byId[id])

    let data = this.updateDataList(postIds, postItems)

    this.setData(data, this.hideSkeleton)
  }
}

Page(enhance(collects, { type: INFOLIST }))

