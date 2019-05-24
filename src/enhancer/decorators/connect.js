const { subscribe, getState } = require('../../store/index')

const connect = {
  onLoad() {
    this.unsubscribe = subscribe(() => this.handleState(getState()))
  },
  Unload() {
    this.unsubscribe()
  }
}

module.exports = connect
