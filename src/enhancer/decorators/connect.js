const { subscribe, getState } = require('../../store/index')

const connect = () => {
  let result = {
    onLoad() {
      this.unsubscribe = subscribe(() => this.handleState(getState()))
    },
    onUnload() {
      this.unsubscribe()
    }
  }

  return result
}

module.exports = connect
