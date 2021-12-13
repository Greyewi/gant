import {applyMiddleware, createStore} from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import reducer from "./reducer"

const carriedStore = ({isLogger}) => {
    const middlewares = [thunk, (isLogger ? logger : null)]
    const enhancer = applyMiddleware(...middlewares)
    return createStore(reducer, enhancer)
}

export default carriedStore
