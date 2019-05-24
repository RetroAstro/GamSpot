const info = {
  props: {
    pageNum: 1
  },
  data: {
    showSkeleton: true,
    loading: false,
    loadedText: '',
    dataList: []
  },
  onPullDownRefresh() {
    this.props.pageNum = 1

    this.setData({ loadedText: '' }, this.fetchDataList)
  },
  onReachBottom() {
    if (!this.data.loading && !this.data.showSkeleton) {
      this.setData({ loading: true }, this.appendDataList)
    }
  },
  updateDataList(dataIds, data) {
    let cursor = this.props.pageNum - 1

    if (this.noMoreData(dataIds)) {
      this.props.pageNum -= 1

      return { loadedText: '没有更多啦 ~' }
    } else {
      qq.stopPullDownRefresh()

      return {
        loading: false,
        ...(cursor == 0 ? { dataList: [data] } : { [`dataList[${cursor}]`]: data })
      }
    }
  },
  noMoreData(dataIds) {
    return !dataIds.length && this.props.pageNum > 1
  }
}

module.exports = info
