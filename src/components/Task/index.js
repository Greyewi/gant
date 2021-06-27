import Task from "./Task"
import {connect} from "react-redux"
import {
  activeTaskEditSelector,
  addEndIntervalTask,
  addStartIntervalTask,
  editableTaskIdSelector,
  editableTaskSideSelector,
  editTask,
  endTempIntervalSelector,
  firstDateIntervalSelector,
  isOpenTaskFormIdSelector,
  setActiveTask,
  startTempIntervalSelector,
  unionTwoTask,
  toggleEditTaskForm
} from "../../modules/tasks"

import {
  formatSelector,
  unitNameSelector
} from '../../modules/timeline'


export default connect(
  (state) => ({
    unitName: unitNameSelector(state),
    format: formatSelector(state),
    editableTaskSide: editableTaskSideSelector(state),
    firstDateInterval: firstDateIntervalSelector(state),
    editableTaskId: editableTaskIdSelector(state),
    isOpenTaskFormId: isOpenTaskFormIdSelector(state),
    startTempInterval: startTempIntervalSelector(state),
    endTempInterval: endTempIntervalSelector(state),
    activeTaskEdit: activeTaskEditSelector(state),
  }),
  {
    unionTwoTask,
    editTask,
    setActiveTask,
    addStartIntervalTask,
    addEndIntervalTask,
    toggleEditTaskForm
  }
)(Task)
