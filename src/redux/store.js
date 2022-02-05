import {applyMiddleware, createStore, compose} from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import reducer from "./reducer"

const carriedStore = ({isLogger}) => {
    const middlewares = [thunk, (isLogger ? logger : null)]
    const enhancer = applyMiddleware(...middlewares)
    return createStore(reducer, compose(enhancer, window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f))
}

export default carriedStore
