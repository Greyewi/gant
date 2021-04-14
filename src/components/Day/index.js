import Day from "./Day"
import {connect} from "react-redux"
import {
  editableTaskIdSelector,
  editableTaskSideSelector,
  activeProcessIdSelector,
  activeTaskEditSelector,
  addEndIntervalTask,
  addNewTask,
  addStartIntervalTask,
  editTask,
  taskListSelector,
  intervalSelector,
  isCreatableSelector,
  isOpenTaskFormIdSelector,
  setActiveTask,
  unionTwoTask
} from "../../modules/tasks"

import {timeFieldArraySelector} from "../../modules/timeline"

export default connect((state) => ({
  editableTaskSide: editableTaskSideSelector(state),
  activeProcessId: activeProcessIdSelector(state),
  isCreatable: isCreatableSelector(state),
  editableTaskId: editableTaskIdSelector(state),
  isOpenTaskFormId: isOpenTaskFormIdSelector(state),
  timeFieldArray: timeFieldArraySelector(state),
  activeTaskEdit: activeTaskEditSelector(state),
  taskList: taskListSelector(state),
  interval: intervalSelector(state)
}), {editTask, unionTwoTask, addNewTask, setActiveTask, addStartIntervalTask, addEndIntervalTask})(Day)