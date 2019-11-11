const compose = require('./compose')
const connect = require('./decorators/connect')
const info = require('./decorators/info')
const share = require('./decorators/share')

const {
  CONNECT,
  INFOLIST
} = require('./types')

const enhance = (origin, { type }) => {
  switch (type) {
    case CONNECT:
      return compose(connect(), share(), origin)
    case INFOLIST:
      return compose(connect(), info(), share(), origin)
    default:
      return origin
  }
}

module.exports = {
  enhance
}
