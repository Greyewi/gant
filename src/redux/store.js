import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import reducer from './reducer'
import createSagaMiddleware from 'redux-saga'
import sagaList from './saga'

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(sagaMiddleware, logger)
const store = createStore(reducer, enhancer)
sagaMiddleware.run(sagaList)

export default store