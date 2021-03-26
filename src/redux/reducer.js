import {combineReducers} from 'redux'
import timeLineReducer, {moduleName as timeLineModule} from '../models/timeline'

export default combineReducers({
    [timeLineModule]: timeLineReducer,

})