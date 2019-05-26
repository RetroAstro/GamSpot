const { actions } = require('../../../store/index')
const { postItems } = require('../../../mock/index')
const { enhance } = require('../../../enhancer/index')
const { INFOLIST } = require('../../../enhancer/types')

const published = {
  data: {
    dataList: [postItems]
  },
  onLoad() {
    actions.fetchMinePosts()
  },
  onNavigate({ detail: { data } }) {
    let params = { ...data, circleId: data.post.circleId }

    qq.navigateTo({ url: `/pages/circle/detail/detail?params=${encodeURIComponent(JSON.stringify(params))}` })
  },
  fetchDataList() {
    actions.fetchMinePosts()
  },
  appendDataList() {
    actions.fetchMinePosts(++this.props.pageNum)
  },
  handleState({ posts, minePosts }) {
    let postIds = minePosts[this.props.pageNum - 1]
    let postItems = postIds.map(id => posts.byId[id])

    let data = this.updateDataList(postIds, postItems)

    this.setData(data, this.hideSkeleton)
  }
}

Page(enhance(published, { type: INFOLIST }))
