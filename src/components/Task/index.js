import Task from "./Task"
import {connect} from "react-redux"
import {
  activeTaskEditSelector,
  addEndIntervalTask,
  addStartIntervalTask,
  editableTaskIdSelector,
  editableTaskSideSelector,
  editTask,
  firstDateIntervalSelector,
  isOpenTaskFormIdSelector,
  setActiveTask,
  unionTwoTask
} from "../../modules/tasks"

export default connect((state) => ({
  editableTaskSide: editableTaskSideSelector(state),
  firstDateInterval: firstDateIntervalSelector(state),
  editableTaskId: editableTaskIdSelector(state),
  isOpenTaskFormId: isOpenTaskFormIdSelector(state),
  activeTaskEdit: activeTaskEditSelector(state),
}), {
  unionTwoTask,
  editTask,
  setActiveTask,
  addStartIntervalTask,
  addEndIntervalTask
})(Task)