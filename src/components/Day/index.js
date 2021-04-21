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
  intervalSelector,
  isCreatableSelector,
  isOpenTaskFormIdSelector,
  setActiveTask,
  unionTwoTask
} from "../../modules/tasks"


export default connect((state) => ({
  editableTaskSide: editableTaskSideSelector(state),
  activeProcessId: activeProcessIdSelector(state),
  isCreatable: isCreatableSelector(state),
  editableTaskId: editableTaskIdSelector(state),
  isOpenTaskFormId: isOpenTaskFormIdSelector(state),
  activeTaskEdit: activeTaskEditSelector(state),
  interval: intervalSelector(state)
}), {editTask, unionTwoTask, addNewTask, setActiveTask, addStartIntervalTask, addEndIntervalTask})(Day)