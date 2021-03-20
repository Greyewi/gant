import {combineReducers} from 'redux'
import gantReducer, {moduleName as gantModule} from '../models/gant'

export default combineReducers({
    [gantModule]: gantReducer,

})