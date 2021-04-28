import DayList from "./DayList"
import {connect} from "react-redux"
import {taskListSelector, activeProcessIdSelector} from "../../modules/tasks"
import {timeFieldArraySelector} from "../../modules/timeline"

export default connect((state) => ({
  activeProcessId: activeProcessIdSelector(state),
  timeFieldArray: timeFieldArraySelector(state),
  taskList: taskListSelector(state),
}))(DayList)