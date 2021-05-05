import Day from "./Day"
import {connect} from "react-redux"
import {
  taskListSelector,
  activeMonthsListSelector,
  activeProcessIdSelector,
  activeTaskEditSelector,
  firstDateIntervalSelector,
  addEndIntervalTask,
  addFirstDateIntervalTask,
  addNewTask,
  addStartIntervalTask,
  editableTaskIdSelector,
  editableTaskSideSelector,
  endTempIntervalSelector,
  isCreatableSelector,
  isOpenTaskFormIdSelector,
  startTempIntervalSelector,
} from "../../modules/tasks"

export default connect((state) => ({
  taskList: taskListSelector(state),
  firstDateInterval: firstDateIntervalSelector(state),
  editableTaskSide: editableTaskSideSelector(state),
  activeProcessId: activeProcessIdSelector(state),
  isCreatable: isCreatableSelector(state),
  editableTaskId: editableTaskIdSelector(state),
  isOpenTaskFormId: isOpenTaskFormIdSelector(state),
  activeTaskEdit: activeTaskEditSelector(state),
  startTempInterval: startTempIntervalSelector(state),
  endTempInterval: endTempIntervalSelector(state),
  activeMonthsList: activeMonthsListSelector(state),
}), {
  addNewTask,
  addStartIntervalTask,
  addFirstDateIntervalTask,
  addEndIntervalTask
})(Day)