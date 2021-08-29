import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'


import reducers from './root-reducer'



const INITIAL_STATE = {}
const enhancers = []
const middleware = [
    thunk,
]

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)

const store = createStore(
    reducers,
    INITIAL_STATE,
    composedEnhancers
)

export default store