import Day from "./Day"
import {connect} from "react-redux"
import {
  activeTaskEditSelector,
  addEndIntervalTask,
  addNewTask,
  addStartIntervalTask,
  editTask,
  intervalSelector,
  isOpenTaskFormIdSelector,
  setActiveTask,
  taskListSelector
} from "../../modules/tasks"

import {timeFieldArraySelector} from "../../modules/timeline"

export default connect((state) => ({
  isOpenTaskFormId: isOpenTaskFormIdSelector(state),
  timeFieldArray: timeFieldArraySelector(state),
  activeTaskEdit: activeTaskEditSelector(state),
  taskList: taskListSelector(state),
  interval: intervalSelector(state)
}), {editTask, addNewTask, setActiveTask, addStartIntervalTask, addEndIntervalTask})(Day)