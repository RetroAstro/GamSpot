const { actions } = require('../../store/index')
const { postItems } = require('../../mock/index')
const { enhance } = require('../../enhancer/index')
const { INFOLIST } = require('../../enhancer/types')

const popular = {
  data: {
    dataList: [postItems]
  },
  onLoad() {
    actions.fetchPopularPosts()
  },
  onNavigate({ detail: { data } }) {
    let route = this.getRoute(data)

    route.navigate()
  },
  getRoute({ tag, post, circleId }) {
    let routes = {
      single() {
        qq.navigateTo({ url: `/pages/circle/single/single?circleId=${circleId}` })
      },
      detail() {
        let params = { tag, post, circleId: post.circleId }

        qq.navigateTo({ url: `/pages/circle/detail/detail?params=${encodeURIComponent(JSON.stringify(params))}` })
      }
    }

    return { navigate: routes[tag == 'circle' ? 'single' : 'detail'] }
  },
  fetchDataList() {
    actions.fetchPopularPosts()
  },
  appendDataList() {
    actions.fetchPopularPosts(++this.props.pageNum)
  },
  handleState({ posts, popularPosts }) {
    let postIds = popularPosts[this.props.pageNum - 1]
    let postItems = postIds.map(id => posts.byId[id])

    let data = this.updateDataList(postIds, postItems)

    this.setData(data, this.hideSkeleton)
  },
  hideSkeleton() {
    this.setData({ showSkeleton: false })
  }
}

Page(enhance(popular, { type: INFOLIST }))
