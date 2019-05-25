const compose = require('./compose')
const connect = require('./decorators/connect')
const info = require('./decorators/info')

const {
  CONNECT,
  INFOLIST
} = require('./types')

const enhance = (origin, { type }) => {
  switch (type) {
    case CONNECT:
      return compose(connect(), origin)
    case INFOLIST:
      return compose(connect(), info(), origin)
    default:
      return origin
  }
}

module.exports = {
  enhance
}
