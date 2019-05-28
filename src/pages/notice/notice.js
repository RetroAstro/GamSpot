const { actions } = require('../../store/index')
const { messages } = require('../../mock/index')
const { enhance } = require('../../enhancer/index')
const { INFOLIST } = require('../../enhancer/types')

const notice = {
  data: {
    messages
  },
  onLoad() {
    actions.fetchUserNotices()
  },
  fetchDataList() {
    actions.fetchUserNotices()
  },
  appendDataList() {
    actions.fetchUserNotices(++this.props.pageNum)
  },
  handleState({ notices, userNotices }) {
    let noticeIds = userNotices[this.props.pageNum - 1]
    let noticeItems = noticeIds.map(id => notices.byId[id])

    let data = this.updateDataList(noticeIds, noticeItems)

    this.setData(data, this.hideSkeleton)
  }
}

Page(enhance(notice, { type: INFOLIST }))
