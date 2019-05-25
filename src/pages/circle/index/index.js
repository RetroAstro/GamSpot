const { actions } = require('../../../store/index')
const { circles } = require('../../../mock/index')
const { enhance } = require('../../../enhancer/index')
const { CONNECT } = require('../../../enhancer/types')

const index = {
  data: {
    circles,
    showSkeleton: true
  },
  onLoad() {
    actions.fetchCircles()
  },
  handleState({ circles }) {
    let data = {
      circles: circles.allIds.map(id => circles.byId[id])
    }

    this.setData(data, this.hideSkeleton)
  },
  hideSkeleton() {
    this.setData({ showSkeleton: false })
  }
}

Page(enhance(index, { type: CONNECT }))
