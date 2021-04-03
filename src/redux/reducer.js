import {combineReducers} from 'redux'
import timeLineReducer, {moduleName as timeLineModule} from '../models/timeline'
import tasksReducer, {moduleName as tasksModule} from '../models/tasks'

export default combineReducers({
    [timeLineModule]: timeLineReducer,
    [tasksModule]: tasksReducer

})