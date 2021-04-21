import DayList from "./DayList"
import {connect} from "react-redux"
import {taskListSelector} from "../../modules/tasks"
import {timeFieldArraySelector} from "../../modules/timeline"

export default connect((state) => ({
  timeFieldArray: timeFieldArraySelector(state),
  taskList: taskListSelector(state),
}))(DayList)