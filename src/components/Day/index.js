import Day from "./Day"
import {connect} from "react-redux"
import {
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
  editTask,
  endTempIntervalSelector,
  isCreatableSelector,
  isOpenTaskFormIdSelector,
  setActiveTask,
  startTempIntervalSelector,
  unionTwoTask
} from "../../modules/tasks"

export default connect((state) => ({
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
  editTask,
  unionTwoTask,
  addNewTask,
  setActiveTask,
  addStartIntervalTask,
  addFirstDateIntervalTask,
  addEndIntervalTask
})(Day)