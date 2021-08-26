import {combineReducers} from "redux"
import timeLineReducer, {moduleName as timeLineModule,} from "../modules/timeline"
import tasksReducer, {moduleName as tasksModule} from "../modules/tasks"
import processReducer, {moduleName as processModule,} from "../modules/processes"

export default combineReducers({
  [processModule]: processReducer,
  [timeLineModule]: timeLineReducer,
  [tasksModule]: tasksReducer,
})
