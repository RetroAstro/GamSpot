const { createStore, applyMiddleware, bindActionCreators } = require('../lib/redux')
const thunk = require('../lib/redux-thunk').default
const rootReducer = require('./reducers/index')
const actionCreators = require('./actions/index')

const store = createStore(
   rootReducer,
   applyMiddleware(thunk)
)

const actions = bindActionCreators(actionCreators, store.dispatch)

const subscribe = callback => store.subscribe(callback.bind(null, store.getState))

module.exports = {
   actions,
   subscribe
}