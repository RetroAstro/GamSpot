const { actions } = require('../../../store/index')
const { postItems } = require('../../../mock/index')
const { enhance } = require('../../../enhancer/index')
const { INFOLIST } = require('../../../enhancer/types')

const single = {
  data: {
    mark: '',
    info: {},
    dataList: [postItems]
  },
  onLoad({ circleId }) {
    qq.hideTabBar()

    this.setData({ 'info.id': circleId }, () => actions.fetchSinglePosts(circleId))
  },
  onUnload() {
    qq.showTabBar()
  },
  onTap() {
    this.setData({ mark: 'join' }, () => actions.joinCircle(this.data.info.id))
  },
  onNavigate({ detail: { data } }) {
    let params = { ...data, circleId: this.data.info.id }

    qq.navigateTo({ url: `/pages/circle/detail/detail?params=${encodeURIComponent(JSON.stringify(params))}` })
  },
  fetchDataList() {
    actions.fetchSinglePosts(this.data.info.id)
  },
  appendDataList() {
    actions.fetchSinglePosts(this.data.info.id, ++this.props.pageNum)
  },
  handleState({ circles, posts, circlePosts }) {
    let postIds = circlePosts[this.data.info.id][this.props.pageNum - 1]
    let postItems = postIds.map(id => posts.byId[id])

    let data = {
      ...this.updateCircleInfo(circles),
      ...this.updateDataList(postIds, postItems)
    }

    this.setData(data, this.hideSkeleton)
  },
  updateCircleInfo(circles) {
    return {
      info: circles.byId[this.data.info.id] || this.data.info
    }
  }
}

Page(enhance(single, { type: INFOLIST }))
