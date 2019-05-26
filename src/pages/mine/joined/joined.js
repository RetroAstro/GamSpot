const { actions } = require('../../../store/index')
const { enhance } = require('../../../enhancer/index')
const { CONNECT } = require('../../../enhancer/types')

const joined = {
  data: {
    circles: []
  },
  onLoad() {
    actions.fetchJoinedCircles()
  },
  onPullDownRefresh() {
    actions.fetchJoinedCircles()
  },
  handleState({ circles, joinedCircles }) {
    let data = {
      circles: joinedCircles.map(id => circles.byId[id])
    }

    this.setData(data, () => qq.stopPullDownRefresh())
  }
}

Page(enhance(joined, { type: CONNECT }))
